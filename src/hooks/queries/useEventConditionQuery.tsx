import { api } from "../../constant/api";
import useFetch from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";
import {useQuery} from "@tanstack/react-query";

export default function useEventConditionQuery(name:string | null, event:string | null) {
  const { readData } = useFetch();
  const { data, isLoading } = useQuery({
    queryFn: () => readData(api.eventCondition(name, event)),
    queryKey: [CacheKey.EVENT_CONDITIONS, name, event],
    staleTime: 10 * 60 * 1000,
    enabled: !!name && !!event
  });
  return { status: data?.status, conditionSchema: data?.data, isLoading };
}
