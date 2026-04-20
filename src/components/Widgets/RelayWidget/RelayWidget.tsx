import {Toggle} from "rsuite";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import {IRelayWidget} from "../../../interfaces/Widgets/IRelayWidget.ts";
// import styles from "./RelayWidget.module.css";
// import GearIcon from "@rsuite/icons/Gear";

export default function RelayWidget({id, state, config, pending}:IRelayWidget){
    // const [extraSettings, setExtraSettings] = useState(state.is_on);
    const mutation = useTriggerActionEventMutation()
    const isLoading =
        mutation.isPending ||
        pending.includes(MessageAction.TOGGLE) ||
        pending.includes(MessageAction.ON) ||
        pending.includes(MessageAction.OFF)
    function handleToggle() {
        const data = peripheralAction(id,MessageAction.TOGGLE, {});
        mutation.mutate(data)
    }
    return (
        <BaseWidget name={config?.name}>
            {/*<IconButton*/}
            {/*    icon={<GearIcon className={styles.icon} />}*/}
            {/*    appearance="link"*/}
            {/*    size="md"*/}
            {/*    onClick={()=>setExtraSettings(true)}*/}
            {/*    className={styles.settingsWrapper}*/}
            {/*    disabled={isLoading}*/}
            {/*/>*/}
            <Toggle checked={state.is_on} onChange={handleToggle} loading={isLoading} />

        </BaseWidget>
    );
}


