import {Toggle} from "rsuite";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import {useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";

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
    const isLoading = mutation.isPending || pending.includes(MessageAction.UPDATE_STATE)
    async function handleToggle(isOn:boolean) {
        setValue(isOn);
        const data = peripheralAction(id,MessageAction.UPDATE_STATE, {is_on:isOn});
        await mutation.mutateAsync(data)
    }

    return (
        <BaseWidget  size="md">
            <Toggle checked={value} onChange={handleToggle} loading={isLoading} />
        </BaseWidget>
    );
}