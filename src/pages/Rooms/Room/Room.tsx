import { useParams } from "react-router-dom";
import {useMemo} from "react";
import styles from "./Room.module.css";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDevicesQuery from "../../../hooks/queries/device/useDevicesQuery.tsx";
import useRoomQuery from "../../../hooks/queries/room/useRoomQuery.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import { useTranslation } from "react-i18next";
import {IDevice} from "../../../interfaces/IDevice.tsx";
import DeviceCard from "../../../components/Cards/DeviceCard/DeviceCard.tsx";

export default function Room() {
    const { t } = useTranslation();
    const state = useParams();
    const { room } = useRoomQuery(state.id ? parseInt(state.id) : 0);
    const deviceIds = useMemo(() => room?.device || [], [room?.device]);
    const { devices } = useDevicesQuery(deviceIds);

    if (!room || !devices) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }
    return (
        <PageContainer>
            <PageHeader title={room.name}>
                <div className={styles.buttonContainer}>
                    <DeviceActionPanel
                        buttons={[
                            { label: t("button.edit"), to: `/rooms/${state.id}/settings`, type: "primary", tooltip: t("room.editTooltip") },
                            { label: t("room.addDeviceButton"), to: `/rooms/${state.id}/add`, type: "default", tooltip: t("room.addDeviceTooltip") },
                        ]}
                        showWifi={false}
                    />
                </div>
            </PageHeader>

            <div className={styles.devices}>
                {devices.map((device: IDevice) => <DeviceCard key={device.id} id={device.id} name={device.name} isOnline={device.is_online} svgId={device.svg_id}/>)}
            </div>
        </PageContainer>
    );
}