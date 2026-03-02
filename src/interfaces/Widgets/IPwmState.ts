import BaseConfig from "./Base.ts";

export interface IPwmState {
    duty_cycle: number
}
export interface IPwmConfig extends BaseConfig{
    pin: number
    frequency: number
    resolution_bits: number

}