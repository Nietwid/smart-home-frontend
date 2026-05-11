import { api } from "../../constant/api";
import useFetch, {ApiError} from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";
import {useQuery} from "@tanstack/react-query";
import { RJSFSchema } from "@rjsf/utils";
import {ReadApiResponse} from "../../type/TApiResponse.ts";

export default function useEventConditionQuery(name:string | undefined, event:string | null) {
  const { readData } = useFetch();
  const { data, isLoading } = useQuery<ReadApiResponse<RJSFSchema>,ApiError>({
    queryFn: () => readData(api.eventCondition(name as string, event as string)),
    queryKey: [CacheKey.EVENT_CONDITIONS, name, event],
    staleTime: 10 * 60 * 1000,
    enabled: Boolean(name && event)
  });
  return { status: data?.status, conditionSchema: data?.data, isLoading };
}
