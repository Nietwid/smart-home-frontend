import {Slider} from "rsuite";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import marks from "./marks.ts";
import {useState} from "react";
import {IPwmWidget} from "../../../interfaces/Widgets/IPwmState.ts";
import styles from "./PinPwmWidget.module.css";


export default function PinPwmWidget({id, state, config, pending}:IPwmWidget){
    const [value, setValue] = useState(state.duty_cycle);
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes(MessageAction.UPDATE_STATE)

    function handleSave(){
        const data = peripheralAction(id, MessageAction.UPDATE_STATE, {"duty_cycle":value});
        mutation.mutate(data)
    }
    return (
        <BaseWidget name={config?.name} size="xl" ratio="4/1">
            <Slider
                className={styles.slider}
                graduated
                progress
                max={100}
                marks={marks}
                renderTooltip={value => `${value}%`}
                onChange={(value)=> setValue(value)}
                onClick={handleSave}
                disabled={isLoading}
                value={value}
            />
        </BaseWidget>
    )
}