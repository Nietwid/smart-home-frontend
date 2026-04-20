import BaseConfig from "./Base";
import IPeripheral from "../IPeripheral";

export interface ISequentialLightWidgetState {
    is_on:boolean;
    brightness: number;
    speed: number;
    lighting_time: number;
    lighting_period: any[];
}
export interface ISequentialLightWidgetConfig extends BaseConfig{
    address: number;
    frequency: number;
    light_count: number;
}

export interface ISequentialLightWidget extends IPeripheral {
    state: ISequentialLightWidgetState
    config: ISequentialLightWidgetConfig
}




