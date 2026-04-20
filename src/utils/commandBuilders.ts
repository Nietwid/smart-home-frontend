import {MessageCommand} from "../enums/message_command.ts";

const Message= {
    ACTION : 1,
    EVENT : 2
} as const

const Scope = {
    CPU : 1,
    PERIPHERAL : 2

} as const

export function cpuAction(
    device_id: string,
    command: MessageCommand,
    payload: Record<string, any> = {}
) {
    return {
        scope: Scope.CPU,
        type: Message.ACTION,
        command,
        device_id,
        payload,
    };
}

export function cpuEvent(
    device_id: string,
    command: MessageCommand,
    payload: Record<string, any> = {}
) {
    return {
        scope: Scope.CPU,
        type: Message.EVENT,
        command,
        device_id,
        payload,
    };
}

export function peripheralAction(
    peripheral_id: number,
    command: MessageCommand,
    payload: Record<string, any> = {}
) {
    return {
        scope: Scope.PERIPHERAL,
        type: Message.ACTION,
        command,
        peripheral_id,
        payload,
    };
}

export function peripheralEvent(
    peripheral_id: number,
    command: MessageCommand,
    payload: Record<string, any> = {}
) {
    return {
        scope: Scope.PERIPHERAL,
        type: Message.EVENT,
        command,
        peripheral_id,
        payload,
    };
}