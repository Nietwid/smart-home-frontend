import BaseConfig from "./Base.ts";
import IPeripheral from "../IPeripheral.ts";

export interface IRGBStripConfig extends BaseConfig {
    r_pin:number
    g_pin:number
    b_pin:number
    frequency: number
    resolution_bits: number
}

export interface IRGBStripState  {
    brightness:number
    is_on:boolean
    r_duty_cycle: number
    g_duty_cycle: number
    b_duty_cycle: number
}

export interface IRGBStripWidget extends IPeripheral {
    state: IRGBStripState
    config: IRGBStripConfig
}