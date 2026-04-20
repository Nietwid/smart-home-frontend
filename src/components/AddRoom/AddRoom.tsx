import { useState } from "react";
import { Modal, Button, Input, Radio, Message, Divider } from "rsuite";
import styles from "./AddRoom.module.css";
import {IRoomAddData} from "../../interfaces/IRoom.tsx";
import useRoomMutation from "../../hooks/queries/room/useRoomMutation.tsx";
import {useTranslation} from "react-i18next";

interface IProps {
    show: boolean;
    onClose: () => void;
}

export default function AddRoom({ show, onClose }: IProps) {
    const [roomData, setRoomData] = useState<IRoomAddData>({ name: "", visibility: "public" });
    const { createRoom } = useRoomMutation();
    const {t} = useTranslation();
    const createRoomMutation = createRoom(handleCancel)

    const handleNameChange = (value: string) => {
        setRoomData({ ...roomData, name: value });
    };

    const handleVisibilityChange = (value: string) => {
        setRoomData({ ...roomData, visibility: value });
    };

    const handleAdd = () => {
        createRoomMutation.mutate(roomData);
    };

    function handleCancel() {
        createRoomMutation.reset();
        setRoomData({ name: "", visibility: "public" });
        onClose();
    }

    const errors = createRoomMutation.error;

    return (
        <Modal
            open={show}
            onClose={handleCancel}
            size="sm"
            className={styles.modal}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title className={styles.modalTitle}>🏠 {t("addRoom.title")}</Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBody}>
                <Input
                    placeholder={t("addRoom.nameInputPlaceholder")}
                    value={roomData.name}
                    onChange={handleNameChange}
                    size="lg"
                    className={styles.input}
                />

                {errors?.details?.name && (
                    <Message showIcon type="error">
                        {errors.details.name[0]}
                    </Message>
                )}

                <Divider className={styles.divider} />

                <div className={styles.radioContainer}>
                    <Radio
                        name="visibility"
                        value="public"
                        checked={roomData.visibility === "public"}
                        onChange={() => handleVisibilityChange("public")}
                    >
                        {t("addRoom.public")}
                    </Radio>
                    <Radio
                        name="visibility"
                        value="private"
                        checked={roomData.visibility === "private"}
                        onChange={() => handleVisibilityChange("private")}
                    >
                        {t("addRoom.private")}
                    </Radio>
                </div>

                {errors?.details?.visibility && (
                    <Message showIcon type="error">
                        {errors.details.visibility[0]}
                    </Message>
                )}
            </Modal.Body>

            <Modal.Footer className={styles.modalFooter}>
                <Button onClick={handleCancel} appearance="subtle" size="lg">
                    {t("button.cancel")}
                </Button>
                <Button onClick={handleAdd} appearance="primary" size="lg" >
                    {t("button.add")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
