import { FieldTemplateProps, ObjectFieldTemplateProps } from '@rjsf/utils';
import { Form  } from 'rsuite';
export const CustomObjectFieldTemplate = ({ properties }: ObjectFieldTemplateProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '4px'
        }}>
            {properties.map((element) => (
                <div key={element.content.key} style={{ width: '100%' }}>
                    {element.content}
                </div>
            ))}
        </div>
    );
};
export const CustomFieldTemplate = ({id,label,children,required,displayLabel,rawErrors,}: FieldTemplateProps) => {
    const hasError = rawErrors && rawErrors.length > 0;
    if (!displayLabel && !hasError) return <>{children}</>;

    return (
        <Form.Group
            controlId={id}
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Form.ControlLabel
                style={{
                    fontSize: '14px',
                    color: hasError ? '#f44336' : '#8e8e93',
                    marginBottom: '4px',
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: 0
                }}
            >
                {label}
                {required && <span style={{ color: '#f44336', marginLeft: '4px' }}>*</span>}
            </Form.ControlLabel>

            <div style={{ width: '100%' }}>
                {children}
            </div>
            {hasError && (
                <Form.ErrorMessage
                    show={true}
                    style={{
                        position: 'static',
                        display: 'block',
                        marginTop: '4px'
                    }}
                >
                    {rawErrors[0]}
                </Form.ErrorMessage>
            )}
        </Form.Group>
    );
};
export const customTemplates = {
    FieldTemplate: CustomFieldTemplate,
    ObjectFieldTemplate: CustomObjectFieldTemplate,
};