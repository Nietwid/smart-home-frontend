import {pinOutputBase} from "./pinOutput"
export const pinInputBase = {
    ...pinOutputBase,
    properties:{
        ...pinOutputBase.properties,
        mode:{
            type: "string",
            title: "Mode",
            enum: ["PULL_UP", "PULL_DOWN", "INPUT"],
            default: "INPUT"
        }
    },
    required:[
        ...pinOutputBase.required, "mode"
    ]

}


export default {
    ...pinInputBase,
    properties: {
        name: {type: "string", title: "Name"},
        ...pinInputBase.properties,
    },
    title: "Digital output pin.",

}