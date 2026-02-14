import {useParams} from "react-router-dom";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import PeripheralCardEdit from "../../../components/Cards/PeripheralCardEdit/PeripheralCardEdit.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {useTranslation} from "react-i18next";

export default function DeviceEditPeripheral() {
    const params = useParams();
    const deviceId = parseInt(params.id ?? "0");
    const {t} = useTranslation();
    const { device } = useDeviceQuery(deviceId);
    if (!device) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    return <PageContainer>
        <PageHeader title={device.name} subtitle={`${t("devicePage.headerSubtitle")} ${device.peripherals.length}`} >
        </PageHeader>
        {device.peripherals.map((peripheral:IPeripheral) => <PeripheralCardEdit {...peripheral}/>)}
    </PageContainer>
}