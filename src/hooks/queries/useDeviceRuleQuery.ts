import {useQuery} from "@tanstack/react-query";
import CacheKey from "../../constant/cacheKey.ts";
import useFetch, {ApiError} from "../useFetch.tsx";
import {api} from "../../constant/api.ts";
import {ReadApiResponse} from "../../type/TApiResponse.ts";

export default function useDeviceRuleQuery(id:number) {
    const {readData} = useFetch();
    const { data, isLoading } = useQuery<ReadApiResponse<any>, ApiError>({
        queryKey: [CacheKey.DEVICE_RULES, id],
        queryFn: ()=> readData(api.deviceRule(id)),
        staleTime: 10 * 60 * 1000,
    })
    return { status: data?.status, rules: data?.data, isLoading };
}