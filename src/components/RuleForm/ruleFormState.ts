import {IDevice} from "../../interfaces/IDevice.tsx";
import IPeripheral from "../../interfaces/IPeripheral.ts";

export type RuleFormState = {
    triggerDevice: IDevice | null
    triggerPeripheral: IPeripheral | null
    triggerEvent: string | null

    targetDevice: IDevice | null
    targetPeripheral: IPeripheral | null
    targetAction: string | null
}
