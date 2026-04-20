import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Panel, Input, InputGroup, Button, Modal, toaster, Message, Divider, Toggle } from "rsuite";
import PageContainer from "../../../components/ui/PageContainer/PageContainer";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader";
import useRoomQuery from "../../../hooks/queries/room/useRoomQuery.tsx";
import useRoomMutation from "../../../hooks/queries/room/useRoomMutation.tsx";
import styles from "./SettingsRoom.module.css";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import displayToaster from "../../../utils/displayToaster.tsx";
import useFavouriteMutation from "../../../hooks/queries/useFavouriteMutation.tsx";
import {useTranslation} from "react-i18next";
import {useQueryClient} from "@tanstack/react-query";
import isFavourite from "../../../utils/isFavourite.ts";
export default function SettingsRoom() {
    const params = useParams();
    const navigate = useNavigate();
    const id = parseInt(params.id || "0");
    const { room, isLoading } = useRoomQuery(id);
    const { updateRoom, deleteRoom } = useRoomMutation();
    const updateMutation = updateRoom(id);
    const deleteMutation = deleteRoom(id);
    const favouriteMutation = useFavouriteMutation();
    const [roomName, setRoomName] = useState(room?.name || "");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const queryClient = useQueryClient();
    const [isSetFavourite, setIsSetFavourite] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {
        setIsSetFavourite(isFavourite(id,queryClient,"room"))
    }, [isFavourite(id,queryClient,"room")]);
    useState(() => {
        if (room) {
            setRoomName(room.name);
        }
    });

    const handleFavouriteToggle = async (checked: boolean) => {
        setIsSetFavourite(checked);
        try {
            await favouriteMutation.mutateAsync({id: id, is_favourite: !checked, type:"room"});
            displayToaster(checked ? t("settingsDevice.favouriteAdded") : t("settingsDevice.favouriteRemoved"))
        } catch (error) {
            displayToaster(t("settingsDevice.favouriteError"),"error")
            setIsSetFavourite(room?.is_favourite || false);
        }
    };

    const handleSaveName = async () => {
        if (!roomName.trim()) {
            toaster.push(
                <Message closable type="warning" showIcon>
                    Nazwa nie może być pusta
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            return;
        }
        setIsUpdating(true);
        try {
            await updateMutation.mutateAsync({ name: roomName });
            toaster.push(
                <Message closable type="success" showIcon>
                    Nazwa pokoju została zaktualizowana
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas aktualizacji nazwy
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } finally {
            setIsUpdating(false);
        }
    };

    const handleChangeVisibility = async (checked: boolean) => {
        const visibility = checked ? "PU" : "PR";
        try {
            await updateMutation.mutateAsync({ visibility });
            toaster.push(
                <Message closable type="success" showIcon>
                    Zmieniono widoczność pokoju
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas zmiany widoczności
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
    };

    const handleDeleteRoom = async () => {
        setShowDeleteModal(false);
        try {
            await deleteMutation.mutateAsync();
            toaster.push(
                <Message closable type="success" showIcon>
                    Pokój został usunięty
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
            navigate("/", { replace: true });
        } catch (error) {
            toaster.push(
                <Message closable type="error" showIcon>
                    Błąd podczas usuwania pokoju
                </Message>,
                { placement: "topCenter", duration: 3000 }
            );
        }
    };

    if (isLoading || !room) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }

    return (
        <PageContainer className={styles.container}>
            <PageHeader title="Ustawienia pokoju">
            </PageHeader>
            <div className={styles.content}>
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>⚙️</span>
                            <span className={styles.panelTitle}>Konfiguracja pokoju</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.configSection}>
                        <label className={styles.configLabel}>📝 Nazwa pokoju</label>
                        <div className={styles.nameSection}>
                            <InputGroup className={styles.inputGroup}>
                                <Input
                                    value={roomName}
                                    onChange={setRoomName}
                                    placeholder="Wprowadź nazwę pokoju"
                                    size="lg"
                                />
                            </InputGroup>
                            <Button
                                appearance="primary"
                                size="lg"
                                onClick={handleSaveName}
                                loading={isUpdating}
                                className={styles.saveButton}
                            >
                                Zapisz
                            </Button>
                        </div>
                    </div>
                    <Divider className={styles.divider} />
                    <div className={styles.configSection}>
                        <div className={styles.toggleSection}>
                            <div className={styles.toggleInfo}>
                                <label className={styles.configLabel}>🔒 Widoczność</label>
                                <p className={styles.configDesc}>
                                    Zmień widoczność pokoju (publiczny/prywatny)
                                </p>
                            </div>
                            <Toggle
                                checked={room.visibility === "public"}
                                onChange={handleChangeVisibility}
                                size="lg"
                                checkedChildren="Publiczny"
                                unCheckedChildren="Prywatny"
                            />
                        </div>
                    </div>
                    <div className={styles.toggleSection}>
                        <div className={styles.toggleInfo}>
                            <label className={styles.configLabel}>⭐{t("settingsDevice.favourite")}</label>
                            <p className={styles.configDesc}>
                                {t("settingsDevice.favouriteDescription")}
                            </p>
                        </div>
                        <Toggle
                            checked={isSetFavourite}
                            onChange={handleFavouriteToggle}
                            size="lg"
                            checkedChildren={t("settingsDevice.yes")}
                            unCheckedChildren={t("settingsDevice.no")}
                        />
                    </div>
                </Panel>
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>🛠️</span>
                            <span className={styles.panelTitle}>Akcje zaawansowane</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.actionsSection}>
                        <div className={styles.actionItem}>
                            <div className={styles.actionInfo}>
                                <h4 className={styles.actionTitle}>🗑️ Usuń pokój</h4>
                                <p className={styles.actionDesc}>
                                    Trwale usuń pokój z systemu. Tej operacji nie można cofnąć.
                                </p>
                            </div>
                            <Button
                                appearance="ghost"
                                color="red"
                                size="lg"
                                onClick={() => setShowDeleteModal(true)}
                                className={styles.deleteButton}
                            >
                                Usuń pokój
                            </Button>
                        </div>
                    </div>
                </Panel>
            </div>
            <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                size="xs"
                className={styles.modalDanger}
            >
                <Modal.Header>
                    <Modal.Title className={styles.modalTitle}>
                        ⚠️ Potwierdź usunięcie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>
                        Czy na pewno chcesz usunąć pokój <strong>{room.name}</strong>?
                    </p>
                    <p className={styles.modalWarning}>
                        ⚠️ Ta operacja jest <strong>nieodwracalna</strong>. Wszystkie dane
                        pokoju zostaną trwale usunięte.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleDeleteRoom}
                        appearance="primary"
                        color="red"
                    >
                        Tak, usuń pokój
                    </Button>
                    <Button
                        onClick={() => setShowDeleteModal(false)}
                        appearance="subtle"
                    >
                        Anuluj
                    </Button>
                </Modal.Footer>
            </Modal>
        </PageContainer>
    );
}