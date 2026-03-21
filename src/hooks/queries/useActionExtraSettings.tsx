import { useQuery } from "@tanstack/react-query";
import { api } from "../../constant/api";
import useFetch from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";

export default function useActionExtraSettings(name:string | null, action:string | null) {
  const { readData } = useFetch();
  const { data, isLoading } = useQuery({
    queryFn: () => readData(`${api.actionExtraSettings}?name=${name}&action=${action}`),
    queryKey: [CacheKey.EXTRA_SETTINGS, name, action],
    staleTime: 10 * 60 * 1000,
    enabled: !!name && !!action
  });
  return { status: data?.status, extraSettingSchema: data?.data, isLoading };
}
