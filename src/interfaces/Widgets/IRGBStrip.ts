import {IPwmState, IPwmConfig} from "./IPwmState.ts";

export interface IRGBStripState {
    brightness:number
    r_pin:IPwmState
    g_pin:IPwmState
    b_pin:IPwmState
}

export interface IRGBStripConfig {
    r_pin:IPwmConfig
    g_pin:IPwmConfig
    b_pin:IPwmConfig
}