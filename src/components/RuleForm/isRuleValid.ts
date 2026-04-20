import {RuleFormState} from "./ruleFormState.ts";
import {IDevice} from "../../interfaces/IDevice.tsx";
import IPeripheral from "../../interfaces/IPeripheral.ts";

export default function isRuleFormValid(state: RuleFormState): state is RuleFormState & {
    triggerDevice: IDevice
    triggerPeripheral: IPeripheral
    triggerEvent: string
    targetDevice: IDevice
    targetPeripheral: IPeripheral
    targetAction: string
} {
    return (
        state.triggerDevice !== null &&
        state.triggerPeripheral !== null &&
        state.triggerEvent !== null &&
        state.targetDevice !== null &&
        state.targetPeripheral !== null &&
        state.targetAction !== null
    )
}