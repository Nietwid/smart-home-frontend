import {useParams} from "react-router-dom";
import useDeviceQuery from "../../../hooks/queries/device/useDeviceQuery.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useHardwareSchemaQuery from "../../../hooks/queries/hardwareSchema/useHardwareSchemaQuery.tsx";
import {SelectPicker} from "rsuite";
import {SyntheticEvent, useState} from "react";
import PeripheralAddForm from "../../../components/PeripheralAddForm/PeripheralAddForm.tsx";

export default function DeviceAddPeripheral() {
    const params = useParams();
    const deviceId = parseInt(params.id ?? "0");
    const { device } = useDeviceQuery(deviceId);
    const { getHardwareSchemasName } = useHardwareSchemaQuery()
    const { data } = getHardwareSchemasName()
    const [displayForm, setDisplayForm] = useState(false);
    const [schemaKey, setSchemaKey] = useState<string>("");

    if (!device || !data ) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    const schemas = data?.data
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
        <SelectPicker data={Object.keys(schemas).map(k=>({ label: k, value: k }))} onChange={handleOnChange}/>
        {displayForm && <PeripheralAddForm deviceId={deviceId} name={schemaKey} key={schemaKey} schema={schemas[schemaKey]}/>}

    </PageContainer>
}