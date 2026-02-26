import {useMutation} from "@tanstack/react-query";
import useFetch, {ApiError} from "../useFetch.tsx";
import {api} from "../../constant/api.ts";
export default function usePeripheralMutation(){
    const {createData, updateData, deleteData} = useFetch()

    function createPeripheralMutation(setErrorCallback:any){
        return useMutation<
            any,
            ApiError,
            any
        >({
            mutationFn: (data:Record<string, any>) => createData(api.peripherals,data),
            onSuccess: (data) => console.log(data),
            onError: (error) => setErrorCallback(error?.details ?? {}),
        })
    }
    return {createPeripheralMutation}
}