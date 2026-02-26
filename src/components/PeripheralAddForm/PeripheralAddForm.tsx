import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import styles from "./PeripheralAddForm.module.css"
import {RsFieldTemplate, RsInputWidget, RsSelectWidget} from "../ui/RsWidget/RsWidget.tsx";
import usePeripheralMutation from "../../hooks/queries/usePeripheralMutation.ts";
import { useState } from "react";
interface IProps{
    deviceId: number
    name:string
    schema: Record<string, unknown>
}
export default function PeripheralAddForm({deviceId, name, schema}:IProps) {
    const {createPeripheralMutation} =  usePeripheralMutation();
    const [extraErrors, setExtraErrors] = useState({});
    const mutation = createPeripheralMutation(setExtraErrors);

    function onSubmitHandler(data:Record<string, any>){
        mutation.mutate({
            name:name,
            device:deviceId,
            config:data
        })
    }
    return <Form
        className={styles.rjsfForm}
        showErrorList={false}
        schema={schema}
        validator={validator}
        extraErrors={extraErrors}
        onChange={(_) => {
            if (extraErrors) setExtraErrors({})
        }}
        templates={{
            FieldTemplate: RsFieldTemplate
        }}
        widgets={{
            TextWidget: RsInputWidget,
            SelectWidget: RsSelectWidget,
        }}
        onSubmit={({ formData }) => onSubmitHandler(formData)}
    />
}