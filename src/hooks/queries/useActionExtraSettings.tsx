import { useQuery } from "@tanstack/react-query";
import { api } from "../../constant/api";
import useFetch, {ApiError} from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";
import {ReadApiResponse} from "../../type/TApiResponse.ts";
import { RJSFSchema } from "@rjsf/utils";

export default function useActionExtraSettings(name:string | undefined, action:string | null) {
  const { readData } = useFetch();
  const { data, isLoading } = useQuery<ReadApiResponse<RJSFSchema>,ApiError>({
    queryFn: () => readData(api.actionExtraSettings(name as string, action as string)),
    queryKey: [CacheKey.EXTRA_SETTINGS, name, action],
    staleTime: 10 * 60 * 1000,
    enabled: Boolean(name && action)
  });
  return { status: data?.status, extraSettingSchema: data?.data, isLoading };
}
