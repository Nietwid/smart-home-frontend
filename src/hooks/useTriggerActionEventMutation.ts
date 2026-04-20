import {useMutation} from "@tanstack/react-query";
import useFetch, {ApiError} from "./useFetch.tsx";
import {api} from "../constant/api.ts";

export default function useTriggerActionEventMutation(){
    const {updateData} = useFetch();
    return useMutation<any, ApiError, any>({
        mutationFn:(data:any) => updateData(api.triggerActionEvent(), data),
        }
    )
}
