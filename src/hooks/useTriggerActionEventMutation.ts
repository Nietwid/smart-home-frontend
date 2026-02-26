import {useMutation} from "@tanstack/react-query";
import useFetch from "./useFetch.tsx";
import {api} from "../constant/api.ts";
import {BaseActionEventMessage} from "../utils/commandBuilders.ts";

export default function useTriggerActionEventMutation(){
    const {updateData} = useFetch();
    return useMutation({
        mutationFn:(data:BaseActionEventMessage) => updateData(api.triggerActionEvent, data),
        onSuccess:(data)=> console.log(data)
        }
    )
}