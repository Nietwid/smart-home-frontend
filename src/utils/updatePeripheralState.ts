import {QueryClient} from "@tanstack/react-query";
import CacheKey from "../constant/cacheKey.ts";
import {IDevice} from "../interfaces/IDevice.tsx";

export default function updatePeripheralState(queryClient: QueryClient, data:any){
    queryClient.setQueryData([CacheKey.DEVICES], (old: any) =>
        old
            ? {
                ...old,
                data: old.data.map((d: IDevice) =>
                    d.id === data.device_id
                        ? {
                            ...d,
                            peripherals: d.peripherals.map((p: any) =>
                                p.id === data.peripheral_id ? { ...p, state: data.state } : p
                            ),
                        }
                        : d
                ),
            }
            : old
    );
}