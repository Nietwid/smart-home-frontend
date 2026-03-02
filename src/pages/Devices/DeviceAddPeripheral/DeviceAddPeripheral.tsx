import {useParams} from "react-router-dom";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {SelectPicker} from "rsuite";
import {SyntheticEvent, useState} from "react";
import PeripheralAddForm from "../../../components/PeripheralAddForm/PeripheralAddForm.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import schemaRegistry from "../../../schemas/schemaRegistry.ts";

type SchemaKey = keyof typeof schemaRegistry;
export default function DeviceAddPeripheral() {
    const params = useParams();
    const deviceId = parseInt(params.id ?? "0");
    const { device } = useDeviceQuery(deviceId);
    const [displayForm, setDisplayForm] = useState(false);
    const [schemaKey, setSchemaKey] = useState<string>("");

    if (!device ) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    function handleOnChange(value: string | null, _: SyntheticEvent<Element, Event>) {
        if (!value) {
            setDisplayForm(false);
            setSchemaKey("");
            return;
        }
        setDisplayForm(true);
        setSchemaKey(value)
    }
    return <PageContainer>
        <PageHeader title={device.name}>
        </PageHeader>
        <SelectPicker data={Object.keys(schemaRegistry).map(k =>({ label: k, value: k }))} onChange={handleOnChange}/>
        {displayForm &&
            <PeripheralAddForm
                deviceId={deviceId}
                loading={device.pending.includes(MessageAction.UPDATE_PERIPHERAL)}
                schemaName={schemaKey}
                key={schemaKey}
                schema={schemaRegistry[schemaKey as SchemaKey]}
            />
        }

    </PageContainer>
}