import {QueryClient} from "@tanstack/react-query";
import CacheKey from "../constant/cacheKey.ts";
import {IDevice} from "../interfaces/IDevice.tsx";

type updatePeripheralPending = {
    pending:string[],
    device_id: number,
    peripheral_id: number,

}

export default function updatePeripheralPending(queryClient: QueryClient, data:updatePeripheralPending){
    queryClient.setQueryData([CacheKey.DEVICES], (old: any) =>
        old
            ? {
                ...old,
                data: old.data.map((d: IDevice) =>
                    d.id === data.device_id
                        ? {
                            ...d,
                            peripherals: d.peripherals.map((p: any) =>
                                p.id === data.peripheral_id ? { ...p, pending: data.pending } : p
                            ),
                        }
                        : d
                ),
            }
            : old
    );
}