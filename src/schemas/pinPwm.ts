import {pinOutputBase} from "./pinOutput.ts";

export const pinPwmBase = {
    ...pinOutputBase,
    properties: {
        pin:pinOutputBase,
        frequency: {type: "number", title: "Frequency", default: 250},
        resolution_bits: {type: "number", title: "Resolution Bits", default: 8}
    },
}

export default {
    ...pinPwmBase,
    properties: {
        name: {type: "string", title: "Name"},
        ...pinPwmBase.properties,

    },
    title:"Single-channel PWM controller"
}