import {QueryClient} from "@tanstack/react-query";
import CacheKey from "../constant/cacheKey.ts";
import {IDevice} from "../interfaces/IDevice.tsx";
type data = {
    actions:string[],
    device_id: number,

}
export default function updateRequiredAction(queryClient: QueryClient, data:data){
    queryClient.setQueryData([CacheKey.DEVICES], (old: any) =>
        old
            ? {
                ...old,
                data: old.data.map((d: IDevice) =>
                    d.id === data.device_id
                        ? {
                            ...d,
                            required_actions: data.actions
                        }
                        : d
                ),
            }
            : old
    );
}