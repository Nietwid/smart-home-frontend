import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Panel,
    Input,
    InputGroup,
    Button,
    Modal,
    Divider,
    List,
    Toggle,
    SelectPicker
} from "rsuite";
import PageContainer from "../../../components/ui/PageContainer/PageContainer";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation";
import WifiStrength from "../../../components/ui/WiFiStrength/WiFiStrength";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery";
import useDeviceMutation from "../../../hooks/queries/device/useDeviceMutation";
import styles from "./SettingsDevice.module.css";
import usePrefetchRoomQuery from "../../../hooks/queries/room/usePrefetchRoomQuery.tsx";
import useFavouriteMutation from "../../../hooks/queries/useFavouriteMutation.tsx";
import {useTranslation} from "react-i18next";
import useFirmwareDeviceQuery from "../../../hooks/queries/useFirmwareDeviceQuery.tsx";
import IFirmwareDevice from "../../../interfaces/IFirmwareDevice.ts";
import displayToaster from "../../../utils/displayToaster.tsx";
import isFavourite from "../../../utils/isFavourite.ts";
import {useQueryClient} from "@tanstack/react-query";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {cpuAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";

export default function SettingsDevice() {
    const { t } = useTranslation();
    const params = useParams();
    const navigate = useNavigate();
    const id = parseInt(params.id || "0");

    const { device, isLoading } = useDeviceQuery(id);
    const { updateDevice, deleteDevice } = useDeviceMutation();
    const { roomData } = usePrefetchRoomQuery();
    const { firmwareList } = useFirmwareDeviceQuery();

    const updateMutation = updateDevice(id);
    const deleteMutation = deleteDevice(id);
    const favouriteMutation = useFavouriteMutation(()=>{});
    const [deviceName, setDeviceName] = useState(device?.name || "");
    const [selectedRoom, setSelectedRoom] = useState<number | null>(device?.room || null);
    const [isSetFavourite, setIsSetFavourite] = useState(false);
    const queryClient = useQueryClient();
    const [showRemoveFromRoomModal, setShowRemoveFromRoomModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const mutation = useTriggerActionEventMutation();

    useEffect(() => {
        setIsSetFavourite(isFavourite(id,queryClient,"device"))
    }, [isFavourite(id,queryClient,"device")]);

    useState(() => {
        if (device) {
            setDeviceName(device.name);
            setSelectedRoom(device.room);
        }
    });

    let updateAvailable = false;

    const handleSaveName = async () => {
        if (!deviceName.trim()) {
            displayToaster(t("settingsDevice.nameEmpty"),"warning")
            return;
        }

        setIsUpdating(true);
        try {
            await updateMutation.mutateAsync({ name: deviceName });
            displayToaster(t("settingsDevice.nameUpdated"))
        } catch (error) {
            displayToaster(t("settingsDevice.nameUpdateError"),"error")
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRoomChange = async (roomId: number | null) => {
        setSelectedRoom(roomId);
        try {
            await updateMutation.mutateAsync({ room: roomId });
            displayToaster(roomId ? t("settingsDevice.roomAssigned") : t("settingsDevice.roomRemoved"))
        } catch (error) {
            displayToaster(t("settingsDevice.roomChangeError"),"error")
            setSelectedRoom(device?.room || null);
        }
    };

    const handleFavouriteToggle = async (checked: boolean) => {
        setIsSetFavourite(checked);
        try {
            await favouriteMutation.mutateAsync({id: id, is_favourite: !checked, type:"device"});
            displayToaster(checked ? t("settingsDevice.favouriteAdded") : t("settingsDevice.favouriteRemoved"))
        } catch (error) {
            displayToaster(t("settingsDevice.favouriteError"),"error")
        }
    };

    const handleRemoveFromRoom = async () => {
        setShowRemoveFromRoomModal(false);
        try {
            await updateMutation.mutateAsync({ room: null });
            setSelectedRoom(null);
            displayToaster(t("settingsDevice.removedFromRoom"))
            navigate("/");
        } catch (error) {
            displayToaster(t("settingsDevice.deleteError"),"error")
        }
    };

    const handleDeleteDevice = async () => {
        setShowDeleteModal(false);
        try {
            await deleteMutation.mutateAsync();
            displayToaster(t("settingsDevice.deleteSuccess"))
            navigate("/");
        } catch (error) {
            displayToaster(t("settingsDevice.deleteError"),"error")
        }
    };

    const handleUpdateFirmware = () =>{
        if (!device?.id) return
        const data = cpuAction(device.mac, MessageAction.UPDATE_FIRMWARE);
        mutation.mutate(data)
    }

    if (isLoading || !device) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }

    if(firmwareList) updateAvailable = firmwareList.some((e:IFirmwareDevice)=>e.to_device === device.chip_type && e.version > device.firmware_version)
    const roomOptions = roomData?.map((room: any) => ({
        label: room.name,
        value: room.id,
    })) || [];

    const formatLastSeen = (dateString: string) => {
        if (!dateString) return t("settingsDevice.never");
        const date = new Date(dateString);
        return date.toLocaleString("pl-PL");
    };

    return (
        <PageContainer className={styles.container}>
            <PageHeader title={t("settingsDevice.title")}>
            </PageHeader>

            <div className={styles.content}>
                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>ℹ️</span>
                            <span className={styles.panelTitle}>{t("settingsDevice.basicInfo")}</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <List>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>{t("settingsDevice.type")}:</span>
                            <span className={styles.infoValue}>{device.chip_type || "N/A"}</span>
                        </List.Item>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>{t("settingsDevice.status")}:</span>
                            <span className={`${styles.infoValue} ${device.is_online ? styles.online : styles.offline}`}>
                                {device.is_online ? "🟢 Online" : "🔴 Offline"}
                              </span>
                        </List.Item>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>{t("settingsDevice.wifiStrength")}:</span>
                            <span className={styles.infoValue}>{device.wifi_strength || "N/A"} dBm</span>
                        </List.Item>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>{t("settingsDevice.lastSeen")}:</span>
                            <span className={styles.infoValue}>{formatLastSeen(device.last_seen)}</span>
                        </List.Item>
                        <List.Item className={styles.infoItem}>
                            <span className={styles.infoLabel}>{t("firmware.firmwareVersion")}:</span>
                            <span className={styles.infoValue}>{device.firmware_version}</span>
                        </List.Item>
                    </List>
                    {updateAvailable && <Button
                        appearance="ghost"
                        size="lg"
                        onClick={() => handleUpdateFirmware()}
                        className={styles.updateFirmwareButton}
                        loading={device.pending.includes("update_firmware")}
                    >
                        {t("firmware.updateFirmware")}
                    </Button>}
                </Panel>

                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>⚙️</span>
                            <span className={styles.panelTitle}>{t("settingsDevice.config")}</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.configSection}>
                        <label className={styles.configLabel}>📝{t("settingsDevice.deviceName")}</label>
                        <div className={styles.nameSection}>
                            <InputGroup className={styles.inputGroup}>
                                <Input
                                    value={deviceName}
                                    onChange={setDeviceName}
                                    placeholder={t("settingsDevice.setDeviceName")}
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
                                {t("buttons.saveButton")}
                            </Button>
                        </div>
                    </div>

                    <Divider className={styles.divider} />

                    <div className={styles.configSection}>
                        <label className={styles.configLabel}>🏠 {t("settingsDevice.roomAssignment")}</label>
                        <SelectPicker
                            data={roomOptions}
                            value={selectedRoom}
                            onChange={handleRoomChange}
                            placeholder={t("settingsDevice.selectRoom")}
                            size="lg"
                            block
                            searchable={false}
                            cleanable
                            className={styles.roomPicker}
                        />
                    </div>

                    <Divider className={styles.divider} />

                    <div className={styles.configSection}>
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
                    </div>
                </Panel>

                <Panel
                    header={
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>🛠️</span>
                            <span className={styles.panelTitle}>{t("settingsDevice.actions")}</span>
                        </div>
                    }
                    bordered
                    className={styles.panel}
                >
                    <div className={styles.actionsSection}>
                        {device.room && (
                            <>
                                <div className={styles.actionItem}>
                                    <div className={styles.actionInfo}>
                                        <h4 className={styles.actionTitle}>🚪{t("settingsDevice.removeFromRoom")}</h4>
                                        <p className={styles.actionDesc}>
                                            {t("settingsDevice.removeDeviceFromRoom")}
                                        </p>
                                    </div>
                                    <Button
                                        appearance="ghost"
                                        size="lg"
                                        onClick={() => setShowRemoveFromRoomModal(true)}
                                        className={styles.removeButton}
                                    >
                                        {t("settingsDevice.deleteDevice")}
                                    </Button>
                                </div>
                                <Divider className={styles.divider} />
                            </>
                        )}

                        <div className={styles.actionItem}>
                            <div className={styles.actionInfo}>
                                <h4 className={styles.actionTitle}>🗑️ {t("settingsDevice.deleteDevice")}</h4>
                                <p className={styles.actionDesc}>
                                    {t("settingsDevice.deleteWarning")}
                                </p>
                            </div>
                            <Button
                                appearance="ghost"
                                color="red"
                                size="lg"
                                onClick={() => setShowDeleteModal(true)}
                                className={styles.deleteButton}
                            >
                                {t("settingsDevice.deleteDevice")}
                            </Button>
                        </div>
                    </div>
                </Panel>
            </div>

            <Modal
                open={showRemoveFromRoomModal}
                onClose={() => setShowRemoveFromRoomModal(false)}
                size="xs"
                className={styles.modal}
            >
                <Modal.Header>
                    <Modal.Title className={styles.modalTitle}>
                        🚪{t("settingsDevice.removeConfirmTitle")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>{t("settingsDevice.removeConfirmText")}</p>
                    <p className={styles.modalNote}>{t("settingsDevice.removeFromRoomNote")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleRemoveFromRoom} appearance="primary">
                        {t("settingsDevice.confirmRemoveFromRoom")}
                    </Button>
                    <Button onClick={() => setShowRemoveFromRoomModal(false)} appearance="subtle">
                        {t("buttons.cancelButton")}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                size="xs"
                className={styles.modalDanger}
            >
                <Modal.Header>
                    <Modal.Title className={styles.modalTitle}>
                        ⚠️{t("settingsDevice.deleteConfirmTitle")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <p>{t("settingsDevice.deleteConfirmText")}</p>
                    <p className={styles.modalWarning}>
                        ⚠️ {t("settingsDevice.deleteWarning")}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDeleteDevice} appearance="primary" color="red">
                        {t("settingsDevice.deleteConfirmTitle")}
                    </Button>
                    <Button onClick={() => setShowDeleteModal(false)} appearance="subtle">
                        {t("buttons.cancelButton")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </PageContainer>
    );
}