import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch, {ApiError} from "../useFetch";
import { api } from "../../constant/api";
import CacheKey from "../../constant/cacheKey.ts";
import {UpdateApiResponse} from "../../type/TApiResponse.ts";

interface IUpdateRuleData {
    enabled:boolean
}

export default function useRuleMutation() {
    const { createData, updateData ,deleteData} = useFetch();
    const queryClient = useQueryClient();
    function createRule() {
        return useMutation<any, ApiError, any>({
            mutationFn: (data: any) => createData(api.rule(), data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CacheKey.DEVICE_RULES] });
            }
        });
    }

    function updateRule(id:number) {
        return useMutation<UpdateApiResponse<any>, ApiError, IUpdateRuleData>({
            mutationFn: (data: IUpdateRuleData) => updateData(api.rule(id), data),
        });
    }

    function deleteRule(id:number) {
        return useMutation({
            mutationFn: () => deleteData(api.rule(id)),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CacheKey.DEVICE_RULES] });
            }
        });
    }

    return { createRule, updateRule, deleteRule};
}
