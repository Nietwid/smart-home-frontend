import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import styles from "./PeripheralAddForm.module.css"
import usePeripheralMutation from "../../hooks/queries/usePeripheralMutation.ts";
import {customWidget} from "../RuleForm/customWidget.tsx";
import {customTemplates} from "../RuleForm/customTemplate.tsx";
import {Button, Message} from "rsuite";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

interface IProps{
    deviceId: number
    schemaName:string
    loading: boolean
    schema: any
}

export default function PeripheralAddForm({deviceId, loading, schemaName, schema}:IProps) {
    const {createPeripheralMutation} =  usePeripheralMutation();
    const {t}=useTranslation();
    const [extraErrors, setExtraErrors] = useState({});
    const mutation = createPeripheralMutation();

    useEffect(() => {
        if (mutation.error?.details) {
            const formatted: Record<string, any> = mutation.error.details;
            setExtraErrors(formatted);
        }
    }, [mutation.error]);

    useEffect(() => {
        if (mutation.isSuccess) {
            setExtraErrors({});
        }
    }, [mutation.isSuccess]);

    function onSubmitHandler(data:Record<string, any>){
        mutation.mutate({
            name: schemaName,
            device: deviceId,
            config: data
        })
    }
    if (loading){
        return <p>LOADING</p>
    }
    return <Form
        key={JSON.stringify(extraErrors)}
        className={styles.rjsfForm}
        showErrorList={false}
        schema={schema}
        validator={validator}
        extraErrors={extraErrors}
        widgets={customWidget}
        templates={customTemplates}
        onSubmit={({ formData }) => onSubmitHandler(formData)}
    >
        <div style={{ marginTop: '24px', marginBottom: '24px'  }}>
            <Button type="submit" appearance="primary">{t("button.save")}</Button>
        </div>
        {mutation.isSuccess && <Message type="success">{t("peripheralAddForm.addSuccess")}</Message>}
    </Form>
}