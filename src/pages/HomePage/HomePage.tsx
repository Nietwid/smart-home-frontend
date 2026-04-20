import { useTranslation } from "react-i18next";
import {Text} from "rsuite";

import PageContainer from "../../components/ui/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import RoomCard from "../../components/Cards/RoomCard/RoomCard.tsx";
import DeviceCard from "../../components/Cards/DeviceCard/DeviceCard.tsx";
import CameraCardHls from "../../components/Cards/CameraCard/Hls/CameraCardHls.tsx";

import useFavouriteQuery from "../../hooks/queries/useFavouriteQuery.tsx";
import useDevicesQuery from "../../hooks/queries/device/useDevicesQuery.tsx";
import useRoomsQuery from "../../hooks/queries/room/useRoomsQuery.tsx";
import useCamerasQuery from "../../hooks/queries/useCamerasQuery.tsx";

import styles from "./HomePage.module.css";

export default function HomePage() {
    const { t } = useTranslation();
    const { favouriteData } = useFavouriteQuery();
    const { cameraData } = useCamerasQuery();

    const { devices } = useDevicesQuery(favouriteData?.devices || []);
    const { rooms } = useRoomsQuery(favouriteData?.rooms || []);

    if (!devices || !rooms || !cameraData) return null;

    const favoriteCameras = cameraData.filter(camera =>
        (favouriteData?.cameras || []).includes(camera.id)
    );

    return (
        <PageContainer>
            <PageHeader title={t("home.title")} subtitle={t("home.subtitle")} />

            <div className={styles.dashboardMosaic}>

                {favoriteCameras.length > 0 && (
                    <div className={styles.cameraSection}>
                        <Text weight="bold" className={styles.capsLabel}>{t("home.cameras")}</Text>
                        <div className={styles.cameraGrid}>
                            {favoriteCameras.map(camera => (
                                <CameraCardHls key={camera.id} {...camera} />
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.deviceSection}>
                    <Text weight="bold" className={styles.capsLabel}>{t("home.devices")}</Text>
                    <div className={styles.deviceGrid}>
                        {devices.map(device => (
                            <DeviceCard key={device.id} id={device.id} name={device.name} isOnline={device.is_online} svgId={device.svg_id}/>
                        ))}
                    </div>
                </div>

                <div className={styles.roomSection}>
                    <Text weight="bold" className={styles.capsLabel}>{t("home.rooms")}</Text>
                    <div className={styles.roomGrid}>
                        {rooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                </div>

            </div>
        </PageContainer>
    );
}