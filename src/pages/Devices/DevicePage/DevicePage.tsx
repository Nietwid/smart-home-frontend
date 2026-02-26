import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import peripheralFactory from "../../../utils/peripheralFactory.tsx";

export default function Device() {

    const { t } = useTranslation();
    const params = useParams();
    const deviceId = parseInt(params.id ?? "0");
    const { device } = useDeviceQuery(deviceId);
    if (!device) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    console.log(device);
    return (
        <PageContainer>
          <PageHeader title={device.name} subtitle={`${t("devicePage.headerSubtitle")} ${device.peripherals.length}`} >
              <DeviceActionPanel
                  buttons={[
                      { label: t("button.deviceSettings"), to: `/devices/${device.id}/settings/`, type: "default"},
                      { label: t("button.editPeripheral"), to: `/devices/${device.id}/peripheral/edit/`, type: "default"},
                      { label: t("button.addPeripheral"), to: `/devices/${device.id}/peripheral/add/`, type: "default"},

                  ]}
                  wifiStrength={device.is_online ? device.wifi_strength : -100}
                  showWifi={true}
              />
          </PageHeader>
            {device.peripherals.map((peripheral:IPeripheral) => peripheralFactory(peripheral))}
        </PageContainer>
    );
}
