import {useReducer,  useState} from "react";
import {Slider, Toggle} from "rsuite";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import Wheel from "@uiw/react-color-wheel";
import {HsvaColor, rgbaToHsva} from "@uiw/color-convert";
import ButtonSave from "../../ui/Buttons/ButtonSave/ButtonSave.tsx";
import {IRGBStripState, IRGBStripConfig} from "../../../interfaces/Widgets/IRGBStrip.ts";
import styles from "./RGBStripWidget.module.css";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import {MessageAction} from "../../../enums/message_command.ts";

interface IRGBStripWidget extends IPeripheral {
    state: IRGBStripState
    config: IRGBStripConfig
}

function setNewState(state: IRGBStripState,config:IRGBStripConfig):IRGBStripState{
    let rPin:number = state.r_duty_cycle;
    let gPin:number = state.g_duty_cycle;
    let bPin:number = state.b_duty_cycle;

    if (rPin === 0 && gPin === 0 && bPin === 0) {
        rPin = Math.pow(2, config.resolution_bits)
        gPin = Math.pow(2, config.resolution_bits)
        bPin = Math.pow(2, config.resolution_bits)
    }
    return {
        r_duty_cycle: rPin,
        g_duty_cycle: gPin,
        b_duty_cycle: bPin,
        brightness: state.brightness,
        is_on: state.is_on,
    }
}

type TAction =
    { type: "set/color", payload:{rgb: { r: number; g: number; b: number }}} |
    { type: "set/brightness", payload:{brightness: number}}|
    { type: "set/isOn", payload:{isOn: boolean}}

const marks = [
    {
        value: 0,
        label: '0%'
    },
    {
        value: 25,
        label: '25%'
    },
    {
        value: 50,
        label: '50%'
    },
    {
        value: 75,
        label: '75%'
    },
    {
        value: 100,
        label: '100%'
    }
];

function reducer(state:IRGBStripState, action:TAction){
    switch(action.type){
        case "set/color":
            return {
                ...state,
                r_duty_cycle:action.payload.rgb.r,
                g_duty_cycle:action.payload.rgb.g,
                b_duty_cycle:action.payload.rgb.b,
            };
            case "set/brightness":
                return {
                    ...state,
                    brightness:action.payload.brightness,
                }
            case "set/isOn":
                return {
                    ...state,
                    is_on:action.payload.isOn,
                }
    }
}

export default function RGBStripWidget({id, state, config, pending}:IRGBStripWidget){
    const [rstate, dispatch] = useReducer(reducer, setNewState(state, config))
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
        <BaseWidget name={config?.name} size="xl">
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
            <ButtonSave loading={isLoading} onSave={handleSave}/>
        </BaseWidget>
    )
}