export interface IRoom {
  id: number;
  name: string;
  visibility: "public" | "private";
  active_device_count: number;
  device_count: number;
  is_favourite: boolean;
  device: number[];
}

export interface IRoomAddData {
  name: string;
  visibility: string;
}

export interface IRoomUpdate{
  name?: string;
  visibility?: "PU"|"PR"
}