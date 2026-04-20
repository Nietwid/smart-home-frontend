import useFetch, {ApiError} from "../useFetch.tsx";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../constant/api.ts";
import CacheKey from "../../constant/cacheKey.ts";
import {ReadApiResponse} from "../../type/TApiResponse.ts";
import {ICamera} from "../../interfaces/ICamera.ts";

export default function useCamerasQuery() {
    const {readData} = useFetch();
    const {data, isLoading} = useQuery<ReadApiResponse<ICamera[]>, ApiError>({
        queryFn: () => readData(api.cameras()),
        queryKey: [CacheKey.CAMERAS],
        staleTime: 10 * 60 * 1000
    });
    return {status: data?.status, cameraData: data?.data, isLoading};
}