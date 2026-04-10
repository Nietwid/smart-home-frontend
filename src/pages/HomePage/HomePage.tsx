import {IRoom} from "../../interfaces/IRoom.tsx";
import RoomCard from "../../components/Cards/RoomCard/RoomCard.tsx";
import {IDevice} from "../../interfaces/IDevice.tsx";
import useFavouriteQuery from "../../hooks/queries/useFavouriteQuery.tsx";
import PageContainer from "../../components/ui/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDevicesQuery from "../../hooks/queries/device/useDevicesQuery.tsx";
import useRoomsQuery from "../../hooks/queries/room/useRoomsQuery.tsx";
import { useTranslation } from "react-i18next";
import styles from "./HomePage.module.css";
import useCamerasQuery from "../../hooks/queries/useCamerasQuery.tsx";
import CameraCardHls from "../../components/Cards/CameraCard/Hls/CameraCardHls.tsx";
import {ICamera} from "../../interfaces/ICamera.tsx";
import countToGridSize from "../../utils/countToGridSize.ts";

import DeviceCard from "../../components/Cards/DeviceCard/DeviceCard.tsx";
export default function HomePage() {
    const { t } = useTranslation();
    const { favouriteData } = useFavouriteQuery();
    const {cameraData} = useCamerasQuery();
    const { devices } = useDevicesQuery(favouriteData?.devices || []);
    const { rooms } = useRoomsQuery(favouriteData?.rooms || []);
    if (!devices || !rooms || !cameraData) return null;
    const cameras = cameraData.filter(camera => (favouriteData?.cameras || []).includes(camera.id))
    const gridSize = countToGridSize(cameras.length)
    return (
      <PageContainer>
        <div className={styles.grid}>
            <PageHeader className={styles.header} title={t("home.title")} subtitle={t("home.subtitle")}>
            </PageHeader>
            <div className={`${styles.deviceContainer} ${styles.background}`}>
                <p className={styles.deviceTitle}>Urządzenia</p>
                <div className={styles.devices}>
                    {devices.map((device: IDevice) => <DeviceCard key={device.id} id={device.id} name={device.name} isOnline={device.is_online} svgId={device.svg_id}/>)}
                </div>
            </div>
            <div className={`${styles.roomContainer} ${styles.background}`}>
                <p className={styles.roomTitle}>Pokoje</p>
                <div className={styles.rooms}>
                    {rooms.map((room: IRoom) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            <div className={styles.cameraContainer}
                 style={
                     {
                         gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                         gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
                     } as React.CSSProperties
                 }>
                    {cameras?.map((camera:ICamera) => (
                        <CameraCardHls key={camera.id} id={camera.id} name={camera.name}/>
                    ))}
            </div>
        </div>
      </PageContainer>
    );
}