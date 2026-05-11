import {Button, Modal,SelectPicker} from "rsuite";
import {useTranslation} from "react-i18next";
import usePrefetchDeviceQuery from "../../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import {useEffect, useReducer, useRef, useState} from "react";
import styles from "./RuleForm.module.css"
import reducer, {initialState} from "./reducer.ts";
import buildBody from "./buildBody.ts";
import isRuleFormValid from "./isRuleValid.ts";
import useRuleMutation from "../../hooks/queries/useRuleMutation.tsx";
import useActionExtraSettings from "../../hooks/queries/useActionExtraSettings.tsx";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import mapErrorsToRjsf from "./mapErrorsToRjsf.ts";
import useEventConditionQuery from "../../hooks/queries/useEventConditionQuery.tsx";
import {customWidget} from "./customWidget.tsx"
import {customTemplates} from "./customTemplate.tsx"
import {initialErrorState} from "./initialErrorState.ts"

const uiSchema = {
    "type": {
        "ui:widget": "hidden",
        "ui:title": " ",
    },
};

interface RuleFormProps {
    open: boolean;
    onClose: () => void;
}

export default function RuleForm({open, onClose}: RuleFormProps) {
    const {t} = useTranslation();
    const {deviceData} = usePrefetchDeviceQuery()
    const [state, dispatch] = useReducer(reducer, initialState)
    const {createRule} = useRuleMutation()
    const mutation = createRule()

    const {extraSettingSchema} =  useActionExtraSettings(state.targetPeripheral?.name, state.targetAction)
    const {conditionSchema} =  useEventConditionQuery(state.triggerPeripheral?.name, state.triggerEvent)

    const formRefCondition = useRef<Form>(null);
    const formRefExtraSettings = useRef<Form>(null);

    const [errorsForm, setErrorsForm] = useState(initialErrorState)

    const triggerDevicePeripheral= state.triggerDevice?.peripherals
        .filter(p=> p.available_event.length > 0)
        ?.map((p:any)=>({ label: `${t(`peripheralName.${p.name}`)}  ${p.config?.name ? `- ${p.config.name}` : "" }`, value:p})) ?? []

    const triggerPeripheralEvents= state.triggerPeripheral?.available_event.map(i=> ({label:t(`messageCommand.${i}`), value:i}))??[]

    const targetDevices = deviceData.map(i=> ({label:i.name, value:i}))
    const targetDevicePeripherals = state.targetDevice?.peripherals
        .filter(p=> p.available_action.length > 0)
        ?.map((p:any) => ({
        label: `${t(`peripheralName.${p.name}`)}  ${p.config?.name ? `- ${p.config.name}` : "" }`,
        value: p
    })) ?? []

    useEffect(() => {
        if (!open || mutation.isSuccess) {
            dispatch({ type: "reset" });
            setErrorsForm(initialErrorState);
        }
    }, [open, mutation.isSuccess]);

    const targetPeripheralAction= state.targetPeripheral?.available_action.map(i=> ({label:t(`messageCommand.${i}`), value:i}))??[]
    function handleSave(){
        const isConditionValid = formRefCondition.current
            ? formRefCondition.current.validateForm()
            : true;

        const isExtraSettingsValid = formRefExtraSettings.current
            ? formRefExtraSettings.current.validateForm()
            : true;

        const newErrors =  {
            triggerDevice: !Boolean(state.triggerDevice),
            triggerPeripheral: !Boolean(state.triggerPeripheral),
            triggerEvent:!Boolean(state.triggerEvent),
            targetDevice: !Boolean(state.targetDevice),
            targetPeripheral: !Boolean(state.targetPeripheral),
            targetAction: !Boolean(state.targetAction),
            condition: !isConditionValid,
            extraSettings: !isExtraSettingsValid
        }
        setErrorsForm(newErrors);
        if(Object.values(newErrors).some(v=> v)) {
            return;
        }
        if (!isRuleFormValid(state)) return;

       const data = buildBody(
           state.triggerDevice.id,
           state.triggerPeripheral.id,
           state.triggerEvent,
           state.targetPeripheral.id,
           state.targetAction,
           state.extraSettings,
           state.condition
        )
        mutation.mutate(data)
    }
    return <Modal open={open} onClose={onClose}>
        <Modal.Header>
            <Modal.Title>{t("ruleForm.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
           <div className={styles.wrapper}>
               <p>{t("ruleForm.triggerSection")}</p>
               <SelectPicker
                   block
                   className={errorsForm.triggerDevice ? styles.error : ""}
                   data={deviceData.map( device=> ({label:device.name, value:device}))}
                   label={t("ruleForm.selectTriggerDevice")}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/device", payload: value })
                   }}
               />
               <SelectPicker
                   block
                   className={errorsForm.triggerPeripheral ? styles.error : ""}
                   disabled={!state.triggerDevice}
                   data={triggerDevicePeripheral}
                   label={t("ruleForm.selectTriggerPeripheral")}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/peripheral", payload: value })
                   }}
               />
               <SelectPicker
                   block
                   className={errorsForm.triggerEvent ? styles.error : ""}
                   label={t("ruleForm.selectTrigger")}
                   disabled={!state.triggerPeripheral}
                   data={triggerPeripheralEvents}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/event", payload: value })
                   }}
               />
               { conditionSchema &&
                   <Form
                       ref={formRefCondition}
                       className={`${styles.rjsfForm} ${errorsForm.extraSettings ? styles.rjsfFormError : ''}`}
                       showErrorList={false}
                       schema={conditionSchema}
                       widgets={customWidget}
                       templates={customTemplates}
                       validator={validator}
                       onChange={({ formData, errors}) => {
                           dispatch({ type: "set/condition", payload: formData })
                           setErrorsForm({...errorsForm, condition: errors.length > 0})
                       }}
                       uiSchema={uiSchema}
                   ><></></Form>
               }
           </div>
            <div className={styles.wrapper}>
                <p>{t("ruleForm.actionSection")}</p>
                <SelectPicker
                   block
                   className={errorsForm.targetDevice ? styles.error : ""}
                   label={t("ruleForm.selectTargetDevice")}
                   data={targetDevices}
                   onChange={(value) => {
                       dispatch({ type: "setTarget/device", payload: value })
                   }}
                />
                <SelectPicker
                   block
                   className={errorsForm.targetPeripheral ? styles.error : ""}
                   label={t("ruleForm.selectTargetPeripheral")}
                   disabled={!state.targetDevice}
                   data={targetDevicePeripherals}
                   onChange={(value) =>
                       dispatch({ type: "setTarget/peripheral", payload: value })
                   }
                />
                <SelectPicker
                   block
                   className={errorsForm.targetAction ? styles.error : ""}
                   label={t("ruleForm.selectTargetAction")}
                   disabled={!state.targetPeripheral}
                   data={targetPeripheralAction}
                   onChange={(value) => {
                       dispatch({ type: "setTarget/action", payload: value })
                   }}
                />
                { extraSettingSchema &&
                    <Form
                        key={state.targetAction}
                        ref={formRefExtraSettings}
                        className={`${styles.rjsfForm} ${errorsForm.extraSettings ? styles.rjsfFormError : ''}`}
                        showErrorList={false}
                        schema={extraSettingSchema}
                        validator={validator}
                        formData={state.extraSettings}
                        widgets={customWidget}
                        templates={customTemplates}
                        extraErrors={mapErrorsToRjsf(mutation.error?.details || {})}
                        onChange={({ formData, errors}) => {
                            dispatch({ type: "set/extraSettings", payload: formData })
                            setErrorsForm({...errorsForm, extraSettings: errors.length > 0})
                        }}
                    ><></></Form>
                }
           </div>
        </Modal.Body>
        <Modal.Footer>
            <Button appearance="subtle" onClick={onClose}>
                {t("button.cancel")}
            </Button>
            <Button appearance="primary" onClick={handleSave}>
                {t("button.save")}
            </Button>
        </Modal.Footer>
    </Modal>
}