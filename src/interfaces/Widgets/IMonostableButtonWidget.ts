import IPeripheral from "../IPeripheral.ts";
import {IPinInputWidgetConfig, IPinInputWidgetState} from "./IPinInput.ts";

export interface IMonostableButtonWidgetState extends IPinInputWidgetState{
}
export interface IMonostableButtonWidgetConfig extends IPinInputWidgetConfig{
}

export interface IMonostableButtonWidget extends IPeripheral {
    state: IMonostableButtonWidgetState
    config: IMonostableButtonWidgetConfig
}