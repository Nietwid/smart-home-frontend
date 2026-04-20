import {useNavigate, useParams} from "react-router-dom";
import { Panel, Button, List } from "rsuite";
import PageContainer from "../../../components/ui/PageContainer/PageContainer";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation";
import useUnassignedDeviceQuery from "../../../hooks/queries/useUnassignedDeviceQuery.tsx";
import useUnassignedDeviceMutation from "../../../hooks/queries/useUnassignedDeviceMutation.tsx";
import { IDevice } from "../../../interfaces/IDevice.tsx";
import styles from "./DeviceAddPage.module.css";
import displayToaster from "../../../utils/displayToaster.tsx";
import {useTranslation} from "react-i18next";

export default function DeviceAddPage() {
    const params = useParams();
    const roomId = parseInt(params.id || "0");
    const { status, unassignedDeviceData } = useUnassignedDeviceQuery();
    const { selectDevice } = useUnassignedDeviceMutation();
    const mutation = selectDevice();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleAddDevice = async (deviceId: number) => {
        try {
            await mutation.mutateAsync({ deviceId, roomId });
            displayToaster(t("assignedDevice.assignedSuccess"));
        } catch (error) {
            displayToaster(t("assignedDevice.assignedError"));
        }
    };

    if (!unassignedDeviceData) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }

    return (
        <PageContainer className={styles.container}>
            <PageHeader title={t("assignedDevice.assign")} className={styles.headers}>
                <Button appearance="default"  onClick={() => navigate(-1)}>
                    {t("button.back")}
                </Button>
            </PageHeader>
            <div className={styles.content}>
                {(status === 404 || unassignedDeviceData.length === 0) && <p className={styles.noDevices}>{t("assignedDevice.noDevices")}</p>}
                {status === 200 && unassignedDeviceData?.length > 0 && (
                    <Panel
                        header={
                            <div className={styles.panelHeader}>
                                <span className={styles.panelIcon}>📱</span>
                                <span className={styles.panelTitle}>{t("assignedDevice.availableDevices")}</span>
                            </div>
                        }
                        bordered
                        className={styles.panel}
                    >
                        <List>
                            {unassignedDeviceData.map((device: IDevice) => (
                                <List.Item key={device.id} className={styles.deviceItem}>
                                    <div className={styles.deviceRow}>
                                        <div className={styles.deviceInfo}>
                                            <span className={styles.deviceName}>{device.name}</span>
                                            <span className={styles.deviceLastSeen}>
                                            {device.last_seen
                                                ? new Date(device.last_seen).toLocaleTimeString("pl-PL", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : "Nigdy"}
                                          </span>
                                        </div>
                                        <Button
                                            appearance="primary"
                                            size="lg"
                                            onClick={() => handleAddDevice(device.id)}
                                            className={styles.assignButton}
                                        >
                                            {t("assignedDevice.assign")}
                                        </Button>
                                    </div>
                                </List.Item>
                            ))}
                        </List>
                    </Panel>
                )}
            </div>
        </PageContainer>
    );
}