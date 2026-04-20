import IEvent from "./IEvent";
import IPeripheral from "./IPeripheral.ts";

export interface IDeviceRoom {
  name: string;
  status: string;
}

export interface IDevice {
  id: number;
  is_online: boolean;
  last_seen: string;
  name: string;
  room: number;
  wifi_strength: number;
  firmware_version:number;
  pending: string[];
  events: IEvent[];
  chip_type:string;
  svg_id:string;
  peripherals: IPeripheral[];
  required_action: string[];
  mac:string;
}
