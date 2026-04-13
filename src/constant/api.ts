import { baseURL } from "./urls";

export const api = {
  refreshToken: () => `${baseURL}/api/token/refresh/`,
  login: () => `${baseURL}/api/login/`,
  logout: () => `${baseURL}/api/logout/`,
  registration: () => `${baseURL}/api/registration/`,
  changePassword: () => `${baseURL}/api/change-password/`,

  hardwareSchema: () => `${baseURL}/api/hardware/schemas`,
  actionExtraSettings: (name:string, action:string) =>
      `${baseURL}/api/hardware/action/settings?name=${name}&action=${action}`,
  eventCondition: (name:string, event:string)=>
      `${baseURL}/api/hardware/event/condition/?name=${name}&event=${event}`,
  peripherals: (id:number|null = null) =>
      id ? `${baseURL}/api/peripherals/${id}` : `${baseURL}/api/peripherals`,
  triggerActionEvent: () => `${baseURL}/api/peripherals/trigger/`,

  rfidCards: (peripheralId:number) =>
      `${baseURL}/api/peripherals/${peripheralId}/card/`,
  rfidCardDetail: (peripheralId:number, cardId:number) =>
      `${baseURL}/api/peripherals/${peripheralId}/card/${cardId}/`,

  device: ()=> baseURL + "/api/device/",
  unassignedDevice: ()=> baseURL + "/api/device/?unassigned=true",
  router: ()=> baseURL + "/api/device/router/",
  cameras: ()=> baseURL + "/api/cameras/",

  rule: (id:number|null = null) =>
      id ? `${baseURL}/api/rule/${id}/` : `${baseURL}/api/rule/`,
  home: (id:number|null = null) =>
      id ? `${baseURL}/api/home/${id}/` : `${baseURL}/api/home/`,
  room: (id:number|null = null) =>
      id ? `${baseURL}/api/room/${id}/` : `${baseURL}/api/room/`,
  favourite: (id:number|null = null) =>
      id ? `${baseURL}/api/favourite/${id}/` : `${baseURL}/api/favourite/`,

  measurement: (peripheralId: number, event: string, startDate: string | null, endDate: string | null) => {
    const params = new URLSearchParams({
      peripheral_id: peripheralId.toString(),
      event: event,
    });

    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    return `${baseURL}/sensor/api/v1/measurement?${params.toString()}`;
  }
};

// export const api = {
//   refreshToken: baseURL + "/api/token/refresh/",
//   login: baseURL + "/api/login/",
//   logout: baseURL + "/api/logout/",
//   registration: baseURL + "/api/registration/",
//   changePassword: baseURL + "/api/change-password/",
//   hardwareSchema: baseURL + "/api/hardware/schemas/",
//   actionExtraSettings: baseURL + "/api/hardware/action/settings",
//   eventCondition: baseURL + "/api/hardware/event/condition",
//   peripherals: baseURL + "/api/peripherals/",
//   triggerActionEvent: baseURL + "/api/peripherals/trigger/",
//   rfidCard: baseURL + "/api/peripherals/card/",
//   rule: baseURL + "/api/rule/",
//   home: baseURL + "/api/home/",
//   room: baseURL + "/api/room/",
//   favourite: baseURL + "/api/favourite/",
//
//   aquarium: baseURL + "/api/aquarium/",
//   rfid: baseURL + "/api/rfid/",
//   lamp: baseURL + "/api/lamp/",
//   stairs: baseURL + "/api/stairs/",
//   button: baseURL + "/api/button/",
//   buttonType: baseURL + "/api/device/button-type/",
//   event: baseURL + "/api/event/",
//   action: baseURL + "/api/event/action/",
//   cameraStream: baseURL + "/stream/",
//   getUpdateLamp: baseURL + "/api/lamp/", // +id
//   tempHum:baseURL + "/api/temperature/",
//   getAllEvents: baseURL + "/api/device/get/event/",
//   firmwareList: baseURL + "/api/firmware/",
//   firmwareUpdate: baseURL + "/api/firmware/update/",
//   temperatureHistory:baseURL + "/sensor/api/v1/temperature",
//   humidityHistory:baseURL + "/sensor/api/v1/humidity",
// };
