import {useRef, useState} from "react";
import {Slider} from "rsuite";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import IPeripheral from "../../../interfaces/IPeripheral.ts";
import Wheel from "@uiw/react-color-wheel";
import {ColorResult, HsvaColor, rgbaToHsva} from "@uiw/color-convert";
import ButtonSave from "../../ui/Buttons/ButtonSave/ButtonSave.tsx";
import {IRGBStripState, IRGBStripConfig} from "../../../interfaces/Widgets/IRGBStrip.ts";
import styles from "./RGBStripWidget.module.css";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";

interface IRGBStripWidget extends IPeripheral {
    state: IRGBStripState
    config: IRGBStripConfig
}
function setNewState(state: IRGBStripState,config:IRGBStripConfig):IRGBStripState{
    let rPin:number = state.r_pin.duty_cycle;
    let gPin:number = state.g_pin.duty_cycle;
    let bPin:number = state.b_pin.duty_cycle;

    if (rPin === 0 && gPin === 0 && bPin === 0) {
        rPin = Math.pow(2, config.r_pin.resolution_bits)
        gPin = Math.pow(2, config.g_pin.resolution_bits)
        bPin = Math.pow(2, config.b_pin.resolution_bits)
    }
    return {
        r_pin: {duty_cycle: rPin },
        g_pin: {duty_cycle: gPin },
        b_pin: {duty_cycle: bPin },
        brightness: state.brightness,
    }
}

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

export default function RGBStripWidget({id, state, config, pending}:IRGBStripWidget){
    const newStateRef = useRef<IRGBStripState>(setNewState(state,config));
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending || pending.includes("set_value")
    const [hsva, setHsva] = useState<HsvaColor>(rgbaToHsva(
        {
            r:newStateRef.current.r_pin.duty_cycle,
            g:newStateRef.current.g_pin.duty_cycle,
            b:newStateRef.current.b_pin.duty_cycle,
            a:1
        }
    ));
    function updateColor(color:ColorResult){
        setHsva(color.hsva);
        newStateRef.current = {
            ...newStateRef.current,
            r_pin:{duty_cycle:color.rgb.r},
            g_pin:{duty_cycle:color.rgb.g},
            b_pin:{duty_cycle:color.rgb.b},
        }
    }
    function updateBrightness(value:number){
        newStateRef.current.brightness = value
    }
    function handleSave(){
        const data = peripheralAction(id,"set_value", newStateRef.current);
        mutation.mutate(data)
    }
    return (
        <BaseWidget  size="xl">
            <Wheel
                color={hsva}
                onChange={updateColor}
            />
            <Slider
                className={styles.slider}
                graduated
                progress
                max={100}
                marks={marks}
                renderTooltip={value => `${value}%`}
                onChange={updateBrightness}
                disabled={isLoading}
            />
            <ButtonSave loading={isLoading} onSave={handleSave}/>

        </BaseWidget>
    )
}