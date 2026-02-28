import {Toggle} from "rsuite";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import {useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";

interface IPinOutputWidgetState {
    is_on:boolean;
}
interface IPinOutputWidgetConfig {
    pin:number;
    name?: string;
}

interface IPinOutputWidget extends IPeripheral {
    state: IPinOutputWidgetState
    config: IPinOutputWidgetConfig
}
export default function PinOutputWidget({id, state, pending}:IPinOutputWidget){
    const [value, setValue] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes("set_value")
    async function handleToggle(value:boolean) {
        setValue(value);
        const data = peripheralAction(id,"set_value", {value:!value});
        await mutation.mutateAsync(data)
    }

    return (
        <BaseWidget  size="md">
            <Toggle checked={value} onChange={handleToggle} loading={isLoading} />
        </BaseWidget>
    );
}