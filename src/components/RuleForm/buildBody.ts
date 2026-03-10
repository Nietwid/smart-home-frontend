
export default function buildBody(
    triggerDeviceId:number,
    triggerPeripheralId:number,
    triggerEvent:string,
    targetPeripheralId:number,
    targetAction:string,
){
    return {
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
                "action": targetAction
            }
        ]
    }
}