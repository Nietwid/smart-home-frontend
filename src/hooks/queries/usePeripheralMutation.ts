import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch, {ApiError} from "../useFetch.tsx";
import {api} from "../../constant/api.ts";
import CacheKey from "../../constant/cacheKey.ts";

export default function usePeripheralMutation(){
    const {createData, deleteData} = useFetch()
    const queryClient = useQueryClient();
    function createPeripheralMutation(){
        return useMutation<
            any,
            ApiError,
            any
        >({
            mutationFn: (data:Record<string, any>) => createData(api.peripherals(), data),
        })
    }

    function deletePeripheralMutation(id:number){
        return useMutation<
            any,
            ApiError,
            any
        >({
            mutationFn: () => deleteData(api.peripherals(id)),
            onSuccess: () => queryClient.invalidateQueries({queryKey:[CacheKey.DEVICES]})
        })
    }
    return {createPeripheralMutation,deletePeripheralMutation}
}