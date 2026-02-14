import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import styles from "./PeripheralAddForm.module.css"
import {RsFieldTemplate, RsInputWidget, RsSelectWidget} from "../ui/RsWidget/RsWidget.tsx";
import usePeripheralMutation from "../../hooks/queries/usePeripheralMutation.ts";
interface IProps{
    deviceId: number
    name:string
    schema: Record<string, unknown>
}
function transformErrors(errors: any[]) {
    return errors.map(error => {
        if (error.name === "minimum") {
            error.message = "Wartość jest za mała";
        }

        if (error.name === "maximum") {
            error.message = "Wartość jest za duża";
        }

        if (error.name === "required") {
            error.message = "To pole jest wymagane";
        }

        return error;
    });
}

export default function PeripheralAddForm({deviceId, name, schema}:IProps) {
    const {createPeripheralMutation} =  usePeripheralMutation()
    const mutation = createPeripheralMutation()
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
        transformErrors={transformErrors}
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