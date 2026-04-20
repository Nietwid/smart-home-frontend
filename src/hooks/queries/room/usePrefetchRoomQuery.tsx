import { useQuery } from "@tanstack/react-query";
import { api } from "../../../constant/api.ts";
import useFetch, {ApiError} from "../../useFetch.tsx";
import CacheKey from "../../../constant/cacheKey.ts";
import {ReadApiResponse} from "../../../type/TApiResponse.ts";
import {IRoom} from "../../../interfaces/IRoom.tsx";

export default function usePrefetchRoomQuery() {
  const { readData } = useFetch();
  const { data, isLoading, isError } = useQuery<
      ReadApiResponse<IRoom[]>,
      ApiError
  >({
    queryKey: [CacheKey.ROOMS],
    queryFn: () => readData(api.room()),
    staleTime: 10 * 60 * 1000,
  });
  return {
    status: data?.status,
    roomData: data?.data,
    isLoading,
    isError
  };
}
