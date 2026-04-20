import {Toggle} from "rsuite";
import {useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import {IPinOutputWidget} from "../../../interfaces/Widgets/IPinOutput.ts";


export default function PinOutputWidget({id, state, config, pending}:IPinOutputWidget){
    const [value, setValue] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes(MessageAction.TOGGLE)
    async function handleToggle(isOn:boolean) {
        setValue(isOn);
        const data = peripheralAction(id,MessageAction.TOGGLE, {});
        await mutation.mutateAsync(data)
    }
    return (
        <BaseWidget name={config?.name}>
            <Toggle checked={value} onChange={handleToggle} loading={isLoading} />
        </BaseWidget>
    );
}