import usePrefetchDeviceQuery from "../../../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import PageContainer from "../../../components/ui/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import {IDevice} from "../../../interfaces/IDevice.tsx";
import DeviceCard from "../../../components/Cards/DeviceCard/DeviceCard.tsx";
import styles from "./DevicesPage.module.css";

export default function Devices() {
  const { deviceData } = usePrefetchDeviceQuery();
  const {t} = useTranslation();

  if (!deviceData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
  return (
    <PageContainer>
      <PageHeader title={t("device.title")}>
      </PageHeader>
        <div className={styles.wrapper}>
            {deviceData.map((device: IDevice) => <DeviceCard key={device.id} id={device.id} name={device.name} isOnline={device.is_online} svgId={device.svg_id}/>)}

        </div>
    </PageContainer>
  );
}
