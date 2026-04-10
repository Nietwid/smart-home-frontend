import BaseConfig from "./Base.ts";
import IPeripheral from "../IPeripheral.ts";

export interface IPwmState {
    duty_cycle: number
}
export interface IPwmConfig extends BaseConfig{
    pin: number
    frequency: number
    resolution_bits: number
}

export interface IPwmWidget extends IPeripheral {
    state: IPwmState
    config: IPwmConfig
}