import BaseConfig from "./Base.ts";
import IPeripheral from "../IPeripheral.ts";

export interface IAht10WidgetState {
    temperature: number
    humidity: number
}
export interface IAht10WidgetConfig extends BaseConfig{
    address: number;
    read_interval: number;
}

export interface IAht10Widget extends IPeripheral {
    state: IAht10WidgetState
    config: IAht10WidgetConfig
}