
export default function buildBody(
    triggerDeviceId:number,
    triggerPeripheralId:number,
    triggerEvent:string,
    targetPeripheralId:number,
    targetAction:string,
    extraSettings:object,
    conditions:object
){
    return {
        "device": triggerDeviceId,
        "triggers": [
            {
                "peripheral": triggerPeripheralId,
                "event": triggerEvent
            }
        ],
        "conditions": [{
            ...conditions,
            "peripheral": triggerPeripheralId,
            "event": triggerEvent
        }],
        "actions": [
            {
                "peripheral": targetPeripheralId,
                "action": targetAction,
                "extra_settings":extraSettings
            }
        ]
    }
}