import {QueryClient} from "@tanstack/react-query";
import CacheKey from "../constant/cacheKey.ts";
import {IDevice} from "../interfaces/IDevice.tsx";

type updateDevicePending = {
    pending:string[],
    device_id: number,
}

export default function updateDevicePending(queryClient: QueryClient, data:updateDevicePending){
    queryClient.setQueryData([CacheKey.DEVICES], (old: any) =>
        old
            ? {
                ...old,
                data: old.data.map((d: IDevice) =>
                    d.id === data.device_id
                        ? { ...d, pending: data.pending } : d
                ),
            }
            : old
    );
}