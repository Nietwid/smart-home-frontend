import usePrefetchDeviceQuery from "../../../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {useTranslation} from "react-i18next";
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
        <div className={`${styles.measurementContainer} ${styles.background}`}>
          <p className={styles.deviceTitle}>Urządzenia pomiarowe</p>
          <div className={styles.measurement}>
          </div>
        </div>
        <div className={`${styles.deviceContainer} ${styles.background}`}>
          <p className={styles.deviceTitle}>Urządzenia</p>
          <div className={styles.devices}>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
