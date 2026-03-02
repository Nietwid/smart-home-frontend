import {IPwmState, IPwmConfig} from "./IPwmState.ts";
import BaseConfig from "./Base.ts";

export interface IRGBStripState  {
    brightness:number
    is_on:boolean
    r_pin:IPwmState
    g_pin:IPwmState
    b_pin:IPwmState
}

export interface IRGBStripConfig extends BaseConfig {
    r_pin:IPwmConfig
    g_pin:IPwmConfig
    b_pin:IPwmConfig
}