import {useMutation} from "@tanstack/react-query";
import useFetch from "../useFetch.tsx";
import {api} from "../../constant/api.ts";

export default function usePeripheralMutation(){
    const {createData, updateData, deleteData} = useFetch()

    function createPeripheralMutation(){
        return useMutation({
            mutationFn: (data:Record<string, any>) => createData(api.peripherals,data),
            onSuccess: (data) => console.log(data),
            onError: (error) => console.log(error.details),
        })
    }
    return {createPeripheralMutation}
}