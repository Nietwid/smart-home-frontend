import PowerIcon from '@rsuite/icons/Off';
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IBistableButtonWidget} from "../../../interfaces/Widgets/IBistableButtonWidget.ts";
import styles from "./ButtonMonostableWidget.module.css"
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import {useRef} from "react";

const PRESS_TIME = 1000
export default function ButtonMonostableWidget({ id, state, config, pending }: IBistableButtonWidget) {
    const mutation = useTriggerActionEventMutation()
    const pressStartTime = useRef<number|null>(null);
    const longPressTimeout = useRef<number|null>(null);

    function triggerEvent(){
        pressStartTime.current = Date.now();
        longPressTimeout.current = window.setTimeout(() => {
            const data = peripheralAction(id, MessageAction.HOLD);
            mutation.mutate(data)
        }, PRESS_TIME)
    }
    function cleanupEvent(){
        if (longPressTimeout.current !== null) {
            window.clearTimeout(longPressTimeout.current)
            longPressTimeout.current = null
        }
        if (pressStartTime.current !== null && Date.now() - pressStartTime.current < PRESS_TIME) {
            const data = peripheralAction(id, MessageAction.CLICK);
            mutation.mutate(data)
        }

    }
    const isOn = state.is_on;
    const isPending = mutation.isPending || pending.includes(MessageAction.HOLD) ||  pending.includes(MessageAction.CLICK);;
    return (
        <BaseWidget name={config?.name} size="md">
            <PowerIcon
                onPointerDown={triggerEvent}
                onPointerUp={cleanupEvent}
                className={`${styles.icon} ${isOn ? styles.active : ''} ${isPending ? styles.pending : ''}`}
            />
        </BaseWidget>
    );
}