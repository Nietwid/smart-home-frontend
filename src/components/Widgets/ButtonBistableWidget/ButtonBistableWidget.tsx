import PowerIcon from '@rsuite/icons/Off';
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IBistableButtonWidget} from "../../../interfaces/Widgets/IBistableButtonWidget.ts";
import styles from "./ButtonBistableWidget.module.css"
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";

export default function BistableButtonWidget({ id, state, config, pending }: IBistableButtonWidget) {
    const mutation = useTriggerActionEventMutation()
    const isOn = state.is_on;
    const handleChange = () => {
        const data = peripheralAction(id, MessageAction.TOGGLE);
        mutation.mutate(data)
    };
    const isPending = mutation.isPending || pending.includes(MessageAction.TOGGLE);
    return (
        <BaseWidget name={config?.name} >
            <PowerIcon onClick={handleChange} className={`${styles.icon} ${isOn ? styles.active : ''} ${isPending ? styles.pending : ''}`} />
        </BaseWidget>
    );
}