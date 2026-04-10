import IPeripheral from "../IPeripheral.ts";
import {IPinOutputWidgetConfig, IPinOutputWidgetState} from "./IPinOutput.ts";

export interface IPirSensorConfigWidget extends IPinOutputWidgetConfig {
    cool_down_time:number
}
export interface IPirSensorStateWidget extends IPinOutputWidgetState {
}

export interface IPirSensorWidget extends IPeripheral {
    state: IPirSensorStateWidget
    config: IPirSensorConfigWidget
}