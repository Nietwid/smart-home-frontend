import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import peripheralFactory from "../../../utils/peripheralFactory.tsx";
import styles from "./DevicePage.module.css"
import RuleForm from "../../../components/RuleForm/RuleForm.tsx";
import {useState} from "react";
import {Button} from "rsuite";
import {cpuAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import SyncType from "../../../constant/syncType.ts";


export default function Device() {

    const { t } = useTranslation();
    const [openForm, setOpenForm] = useState<boolean>(false);
    const params = useParams();
    const deviceId = parseInt(params.id ?? "0");
    const mutation = useTriggerActionEventMutation()
    const { device } = useDeviceQuery(deviceId);
    async function startSync() {
        if (!device) return;
        const data = cpuAction(device.mac, MessageAction.SYNC_START, {sync_type:SyncType.PERIPHERAL});
        await mutation.mutateAsync(data)
    }
    if (!device) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    console.log(device)
    return (
        <PageContainer>
          <PageHeader title={device.name} subtitle={`${t("devicePage.headerSubtitle")} ${device.peripherals.length}`} >
              {device.required_action.includes(MessageAction.UPDATE_PERIPHERAL) ?
                  <Button appearance="subtle" onClick={startSync}>
                      {t("button.updatePeripheral")}
                  </Button>:
                  <Button appearance="subtle" onClick={()=>setOpenForm(true)}>
                      {t("button.addEvent")}
                  </Button>
              }
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
            <RuleForm open={openForm} onClose={()=>setOpenForm(false)} />

            {device.required_action.includes(MessageAction.UPDATE_PERIPHERAL) ? <div>UPDATE</div> : <div className={styles.wrapper}>
                {device.peripherals.map((peripheral:IPeripheral) => peripheralFactory(peripheral))}
            </div>}
        </PageContainer>
    );
}
