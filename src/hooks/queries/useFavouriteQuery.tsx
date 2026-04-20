import { useQuery } from "@tanstack/react-query";
import { api } from "../../constant/api";
import useFetch, {ApiError} from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";
import {ReadApiResponse} from "../../type/TApiResponse.ts";
interface IFavouriteData {
  devices:number[],
  rooms:number[]
  cameras:number[]
}
export default function useFavouriteQuery() {
  const { readData } = useFetch();
  const { data, isLoading } = useQuery<ReadApiResponse<IFavouriteData>, ApiError>({
    queryFn: () => readData(api.favourite()),
    queryKey: [CacheKey.FAVOURITES],
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, favouriteData: data?.data, isLoading };
}
