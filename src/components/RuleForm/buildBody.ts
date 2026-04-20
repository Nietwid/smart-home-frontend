
export default function buildBody(
    triggerDeviceId:number,
    triggerPeripheralId:number,
    triggerEvent:string,
    targetPeripheralId:number,
    targetAction:string,
    extraSettings:object,
    conditions:object
){
    const base = {
        "device": triggerDeviceId,
        "triggers": [
            {
                "peripheral": triggerPeripheralId,
                "event": triggerEvent
            }
        ],
        "actions": [
            {
                "peripheral": targetPeripheralId,
                "action": targetAction,
                "extra_settings":extraSettings
            }
        ]
    }
    console.log(conditions)
    if (Object.keys(conditions).length > 0) {
        base["conditions"] = [{
            ...conditions,
            "peripheral": triggerPeripheralId,
            "event": triggerEvent
        }]
    }
    return base

}