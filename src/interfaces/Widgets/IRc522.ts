import BaseConfig from "./Base.ts";
import IPeripheral from "../IPeripheral.ts";

export interface IRc522WidgetConfig extends BaseConfig{
    ss: number
    rst: number
}
export interface IRc522WidgetState {
}

export interface IRc522Widget extends IPeripheral {
    state: IRc522WidgetState
    config: IRc522WidgetConfig
}