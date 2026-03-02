import {pinPwmBase} from "./pinPwm.ts";


export default {
    properties:{
        name: {type: "string", title: "Name"},
        r_pin: {...pinPwmBase, title: "Red channel pin"},
        g_pin: {...pinPwmBase, title: "Green channel pin"},
        b_pin: {...pinPwmBase, title: "Blue channel pin"},
    },
    required: [
        "r_pin",
        "g_pin",
        "b_pin"
    ],
    title: "RGB LED strip controller.",
    type: "object"
}