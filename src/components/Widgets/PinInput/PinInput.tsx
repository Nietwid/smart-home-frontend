import {useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {MessageAction, MessageEvent} from "../../../enums/message_command.ts";
import {peripheralEvent} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {Toggle} from "rsuite";
import {IPinInputWidget} from "../../../interfaces/Widgets/IPinInput.ts";

export default function PinInput({id, state, config, pending}:IPinInputWidget){
    const [value, setValue] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes(MessageAction.TOGGLE)
    async function handleToggle(value:boolean) {
        setValue(value);
        const data = peripheralEvent(id, MessageEvent.ON_TOGGLE, {});
        await mutation.mutateAsync(data)
    }
    return (
        <BaseWidget name={config?.name} size="md">
            <Toggle checked={value} onChange={handleToggle} loading={isLoading} />
        </BaseWidget>
    );
}