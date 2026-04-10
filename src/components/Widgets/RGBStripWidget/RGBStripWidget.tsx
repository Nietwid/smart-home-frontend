import {useReducer,  useState} from "react";
import {Button, Slider, Toggle} from "rsuite";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import Wheel from "@uiw/react-color-wheel";
import {HsvaColor, rgbaToHsva} from "@uiw/color-convert";
import {IRGBStripWidget} from "../../../interfaces/Widgets/IRGBStrip.ts";
import styles from "./RGBStripWidget.module.css";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";
import reducer from "./reducer.ts";
import marks from "./marks.ts";
import initState from "./initState.ts";
import {useTranslation} from "react-i18next";

export default function RGBStripWidget({id, state, config, pending}:IRGBStripWidget){
    const [rstate, dispatch] = useReducer(reducer, initState(state, config))
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes(MessageAction.UPDATE_STATE)
    const [hsva, setHsva] = useState<HsvaColor>(rgbaToHsva(
        {
            r:rstate.r_duty_cycle,
            g:rstate.g_duty_cycle,
            b:rstate.b_duty_cycle,
            a:1
        }
    ));
    const {t} = useTranslation();

    function handleSave(){
        const data = peripheralAction(id, MessageAction.UPDATE_STATE, rstate);
        mutation.mutate(data)
    }
    function handleToggle(value: boolean){
        dispatch({type:"set/isOn",payload:{isOn:value}})
        const data = peripheralAction(id, MessageAction.TOGGLE, {});
        mutation.mutate(data)
    }
    return (
        <BaseWidget name={config?.name} w={3} h={3}>
            <Wheel
                color={hsva}
                onChange={(color) => {
                    dispatch({
                        type: "set/color",
                        payload: {rgb: color.rgb},
                    });
                    setHsva(color.hsva);
                }}
            />
            <Slider
                className={styles.slider}
                graduated
                progress
                max={100}
                marks={marks}
                renderTooltip={value => `${value}%`}
                onChange={(value)=> dispatch({ type:"set/brightness",payload:{brightness:value}})}
                disabled={isLoading}
                value={rstate.brightness}
            />
            <Toggle
                className={styles.toggle}
                checked={rstate.is_on}
                onChange={handleToggle}
                loading={isLoading || pending.includes(MessageAction.TOGGLE)}
            />
            <Button
                width={250}
                loading={isLoading}
                onClick={handleSave}
                className={styles.saveButton}
            >
                {t("buttons.saveButton")}
            </Button>
        </BaseWidget>
    )
}