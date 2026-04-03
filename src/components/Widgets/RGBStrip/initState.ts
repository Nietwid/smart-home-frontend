import {IRGBStripConfig, IRGBStripState} from "../../../interfaces/Widgets/IRGBStrip.ts";

export default function initState(state: IRGBStripState,config:IRGBStripConfig):IRGBStripState{
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