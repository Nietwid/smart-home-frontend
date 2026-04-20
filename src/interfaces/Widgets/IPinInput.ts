import BaseConfig from "./Base.ts";
import IPeripheral from "../IPeripheral.ts";

export interface IPinInputWidgetState {
    is_on:boolean;
}
export interface IPinInputWidgetConfig extends BaseConfig{
    pin:number;
    mode: "PULL_UP" | "PULL_DOWN" | "INPUT"
}

export interface IPinInputWidget extends IPeripheral {
    state: IPinInputWidgetState
    config: IPinInputWidgetConfig
}