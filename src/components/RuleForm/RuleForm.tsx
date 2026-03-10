import {Button, Modal,SelectPicker} from "rsuite";
import {useTranslation} from "react-i18next";
import usePrefetchDeviceQuery from "../../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import {useReducer, useState} from "react";
import styles from "./RuleForm.module.css"
import reducer from "./reducer.ts";
import buildBody from "./buildBody.ts";
import {RuleFormState} from "./ruleFormState.ts";
import isRuleFormValid from "./isRuleValid.ts";
import {bool} from "prop-types";
import useRuleMutation from "../../hooks/queries/useRuleMutation.tsx";



const initialState: RuleFormState = {
    triggerDevice: null,
    triggerPeripheral: null,
    triggerEvent: null,

    targetDevice: null,
    targetPeripheral: null,
    targetAction: null
}

interface RuleFormProps {
    open: boolean;
    onClose: () => void;
}


export default function RuleForm({open, onClose}: RuleFormProps) {
    const {deviceData} = usePrefetchDeviceQuery()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [errors, setErrors] = useState({
        triggerDevice: false,
        triggerPeripheral: false,
        triggerEvent:false,
        targetDevice: false,
        targetPeripheral: false,
        targetAction:false
    })
    const {createRule} = useRuleMutation()
    const mutation = createRule()
    const {t} = useTranslation();

    const triggerDevicePeripheral= state.triggerDevice?.peripherals
        .filter(per=> per.available_event.length > 0)
        ?.map(per=>({label:per.name, value:per})) ?? []

    const triggerPeripheralEvents= state.triggerPeripheral?.available_event.map(i=> ({label:i, value:i}))??[]

    const targetDevices = deviceData.map(i=> ({label:i.name, value:i}))
    const targetDevicePeripherals = state.targetDevice?.peripherals
        .filter(p=> p.available_action.length > 0)
        ?.map((p:any) => ({
        label: `${p.name}  ${p.config?.name ? `- ${p.config.name}` : "" }`,
        value: p
    })) ?? []
    const targetPeripheralAction= state.targetPeripheral?.available_action.map(i=> ({label:i, value:i}))??[]

    function handleSave(){
        setErrors(
            {
                triggerDevice: !Boolean(state.triggerDevice),
                triggerPeripheral: !Boolean(state.triggerPeripheral),
                triggerEvent:!Boolean(state.triggerEvent),
                targetDevice: !Boolean(state.targetDevice),
                targetPeripheral: !Boolean(state.targetPeripheral),
                targetAction:!Boolean(state.targetAction)
            }
        )
        if(!isRuleFormValid(state)) {
            return;
        }

       const data = buildBody(
            state.targetDevice.id,
            state.targetPeripheral.id,
            state.triggerEvent,
            state.targetPeripheral.id,
            state.targetAction,
        )
        mutation.mutate(data)
    }

    return <Modal open={open}>
        <Modal.Header>
            <Modal.Title>{t("ruleForm.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
           <div className={styles.wrapper}>
               <p>{t("ruleForm.triggerSection")}</p>
               <SelectPicker
                   block
                   className={errors.triggerDevice ? styles.error : ""}
                   data={deviceData.map( device=> ({label:device.name, value:device}))}
                   label={t("ruleForm.selectTriggerDevice")}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/device", payload: value })
                   }}
               />
               <SelectPicker
                   block
                   className={errors.triggerPeripheral ? styles.error : ""}
                   disabled={!state.triggerDevice}
                   data={triggerDevicePeripheral}
                   label={t("ruleForm.selectTriggerPeripheral")}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/peripheral", payload: value })
                   }}
               />
               <SelectPicker
                   block
                   className={errors.triggerEvent ? styles.error : ""}
                   label={t("ruleForm.selectTrigger")}
                   disabled={!state.triggerPeripheral}
                   data={triggerPeripheralEvents}
                   onChange={(value) => {
                       dispatch({ type: "setTrigger/event", payload: value })
                   }}
               />
           </div>
            <div className={styles.wrapper}>
                <p>{t("ruleForm.actionSection")}</p>
                <SelectPicker
                   block
                   className={errors.targetDevice ? styles.error : ""}
                   label={t("ruleForm.selectTargetDevice")}
                   data={targetDevices}
                   onChange={(value) => {
                       dispatch({ type: "setTarget/device", payload: value })
                   }}
                />
                <SelectPicker
                   block
                   className={errors.targetPeripheral ? styles.error : ""}
                   label={t("ruleForm.selectTargetPeripheral")}
                   disabled={!state.targetDevice}
                   data={targetDevicePeripherals}
                   onChange={(value) =>
                       dispatch({ type: "setTarget/peripheral", payload: value })
                   }
                />
                <SelectPicker
                   block
                   className={errors.targetAction ? styles.error : ""}
                   label={t("ruleForm.selectTargetAction")}
                   disabled={!state.targetPeripheral}
                   data={targetPeripheralAction}
                   onChange={(value) => {
                       dispatch({ type: "setTarget/action", payload: value })
                   }}
                />
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