export const pinOutputBase = {
    properties: {
        pin: {type: "number", title: "GPIO Pin", minimum: 0, maximum: 40},
    },
    required: ["pin"],
    type: "object"
}


export default {
    ...pinOutputBase,
    properties: {
        name: {type: "string", title: "Name"},
        ...pinOutputBase.properties,
    },
    title: "Digital output pin.",

}