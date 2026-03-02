import IPeripheral from "../IPeripheral.ts";
import BaseConfig from "./Base.ts";

export interface IPinOutputWidgetState {
    is_on:boolean;
}
export interface IPinOutputWidgetConfig extends BaseConfig{
    pin:number;
}

export interface IPinOutputWidget extends IPeripheral {
    state: IPinOutputWidgetState
    config: IPinOutputWidgetConfig
}