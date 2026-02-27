export interface IPwmState {
    duty_cycle: number
}
export interface IPwmConfig {
    pin: number
    frequency: number
    resolution_bits: number

}