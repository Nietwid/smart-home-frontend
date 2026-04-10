import IPeripheral from "../IPeripheral.ts";
import {IPinOutputWidgetConfig, IPinOutputWidgetState} from "./IPinOutput.ts";

export interface IRelayWidgetState extends IPinOutputWidgetState {
}
export interface IRelayWidgetConfig extends IPinOutputWidgetConfig {
}

export interface IRelayWidget extends IPeripheral {
    state: IRelayWidgetState
    config: IRelayWidgetConfig
}