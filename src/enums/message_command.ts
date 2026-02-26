
const MessageEvent = {
    STATE_CHANGE: "state_change",
    UPDATE_FIRMWARE: "update_firmware",
    UPDATE_FIRMWARE_ERROR: "update_firmware_error",
    UPDATE_CONFIG: "update_config",
    TURN_ON: "turn_on",
    TURN_OFF: "turn_off",
    ON_CLICK: "on_click",
    ON_HOLD: "on_hold",
    ON_TOGGLE: "on_toggle",
} as const

const MessageAction = {
    ON: "on",
    OFF: "off",
    BLINK: "blink",
    TOGGLE: "toggle",
    ADD_TAG: "add_tag",
    SET_VALUE: "set_value",
    SET_COLOR: "set_color",
} as const


export type MessageEventType = typeof MessageEvent[keyof typeof MessageEvent]
export type MessageActionType = typeof MessageAction[keyof typeof MessageAction]

export type MessageCommand = MessageEventType | MessageActionType