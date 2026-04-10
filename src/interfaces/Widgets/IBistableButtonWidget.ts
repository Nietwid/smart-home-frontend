import IPeripheral from "../IPeripheral.ts";
import {IPinInputWidgetConfig, IPinInputWidgetState} from "./IPinInput.ts";

export interface IBistableButtonWidgetState extends IPinInputWidgetState{
}
export interface IBistableButtonWidgetConfig extends IPinInputWidgetConfig{
}

export interface IBistableButtonWidget extends IPeripheral {
    state: IBistableButtonWidgetState
    config: IBistableButtonWidgetConfig
}