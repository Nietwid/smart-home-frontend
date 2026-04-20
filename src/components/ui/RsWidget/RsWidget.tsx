import { WidgetProps, FieldTemplateProps } from '@rjsf/utils';
import { Input, SelectPicker } from "rsuite";
import styles from "./RsWidget.module.css"
export function RsInputWidget({id, value, required, disabled, readonly, label, onChange, placeholder,rawErrors}: WidgetProps) {
    return (
       <>
           <Input
               id={id}
               value={value || ""}
               disabled={disabled || readonly}
               placeholder={placeholder}
               onChange={val => onChange(val)}
           />
       </>
    );
};

export function RsSelectWidget (props: WidgetProps) {
    const { id, value, required, disabled, readonly, label, onChange, options } = props;
    return (
        <SelectPicker
            id={id}
            data={options.enumOptions?.map((o: { label: string; value: string; }) => ({ label: o.label, value: o.value })) || []}
            value={value}
            disabled={disabled || readonly}
            onChange={val => onChange(val)}
            block
        />
    );
};

export function RsFieldTemplate(props: FieldTemplateProps) {
    const {
        id,
        label,
        required,
        description,
        errors,
        children
    } = props;

    return (
        <div style={{ marginBottom: 10 }}>
            {label && (
                <label htmlFor={id}>
                    {label}{required && "*"}
                </label>
            )}

            {description}

            {children}

            {errors && (
                <div className={styles.error}>
                    {errors}
                </div>
            )}
        </div>
    );
}