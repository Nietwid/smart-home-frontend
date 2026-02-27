import {Toggle} from "rsuite";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import {useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";

interface IPinOutputWidgetState {
    value:boolean;
}
interface IPinOutputWidgetConfig {
    pin:number;
    name?: string;
}

interface IPinOutputWidget extends IPeripheral {
    state: IPinOutputWidgetState
    config: IPinOutputWidgetConfig
}
export default function PinOutputWidget({id, state, pending, config}:IPinOutputWidget){
    console.log(pending)
    const [value, setValue] = useState(state.value);
    const [loading, setLoading] = useState(false);
    const mutation = useTriggerActionEventMutation()
    const isLoading = loading || pending.includes("set_value")
    async function handleToggle(value:boolean) {
        setValue(value);
        setLoading(true);
        const data = peripheralAction(id,"set_value", {value:value});
        await mutation.mutateAsync(data)
        setLoading(false);
    }


    return (
        <BaseWidget name={config.name} size="md">
            <Toggle checked={value} onChange={handleToggle} loading={isLoading} />
        </BaseWidget>
    );
}