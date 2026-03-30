import {useEffect, useState} from "react";
import { Modal, Button, Input, Message, Loader, Divider } from "rsuite";
import styles from "./AddCardForm.module.css";
import {useTranslation} from "react-i18next";
import MessageType from "../../../../constant/message_type.ts";
import {MessageAction} from "../../../../enums/message_command.ts";
import useTriggerActionEventMutation from "../../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../../utils/commandBuilders.ts";

interface AddCardFormProps {
    id: number;
    handleAddFunction: () => void;
    show: boolean;
    pending: boolean;
}

export default function AddCardForm({id, handleAddFunction, show, pending}: AddCardFormProps) {
    const { t } = useTranslation();
    const mutation = useTriggerActionEventMutation()
    const [name, setName] = useState("");
    const [intentId] = useState(() => crypto.randomUUID());
    const [status, setStatus] = useState<number | null>(null);
    useEffect(() => {
        const handleRfidEvent = (event: any) => {
            console.log(event)
            const { intent_id, status } = event.detail;
            if (intent_id !== intentId) return;
            setStatus(status);

        };
        window.addEventListener(MessageType.ADD_TAG_RESULT, handleRfidEvent);
        return () => window.removeEventListener(MessageType.ADD_TAG_RESULT, handleRfidEvent);
    }, [intentId]);

    const handleSubmit = () => {
        const data = peripheralAction(id, MessageAction.ADD_TAG, {"name":name, "intent_id": intentId});
        mutation.mutate(data)
    };

    const handleCancel = () => {
        handleAddFunction();
    };
    return (
        <Modal
            open={show}
            onClose={handleCancel}
            size="sm"
            className={styles.modal}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title className={styles.modalTitle}>💳 {t("addCardForm.addCardTitle")}</Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBody}>
                {pending ? (
                    <div className={styles.pendingContainer}>
                        <Loader size="md" content={t("addCardForm.pendingMessage")} vertical />
                    </div>
                ) : (
                    <>
                        <p className={styles.modalText}>
                            {t("addCardForm.instruction")}
                        </p>

                        <Input
                            placeholder={t("addCardForm.cardNamePlaceholder")}
                            value={name}
                            onChange={setName}
                            size="lg"
                            className={styles.input}
                        />

                        <Divider className={styles.divider} />

                        {/*{error?.details?.non_field_errors && (*/}
                        {/*    <Message showIcon type="error">*/}
                        {/*        {error.details.non_field_errors}*/}
                        {/*    </Message>*/}
                        {/*)}*/}
                        {/*{error?.details?.name && (*/}
                        {/*    <Message showIcon type="error">*/}
                        {/*        {t("addCardForm.errorNameRequired")}*/}
                        {/*    </Message>*/}
                        {/*)}*/}
                        {status === 201 && (
                            <Message showIcon type="success">
                                {t("addCardForm.success")}
                            </Message>
                        )}
                        {status === 400 && (
                            <Message showIcon type="error">
                                {t("addCardForm.error400")}
                            </Message>
                        )}
                        {status === 409 && (
                            <Message showIcon type="error">
                                {t("addCardForm.error409")}
                            </Message>
                        )}
                    </>
                )}
            </Modal.Body>

            <Modal.Footer className={styles.modalFooter}>
                <Button
                    onClick={handleCancel}
                    appearance="subtle"
                    size="lg"
                >
                    {t("buttons.cancelButton")}
                </Button>
                <Button
                    onClick={handleSubmit}
                    appearance="primary"
                    size="lg"
                    disabled={pending}
                >
                    {t("buttons.addButton")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
