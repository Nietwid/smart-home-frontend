import useFetch from "../useFetch.tsx";
import {useQuery} from "@tanstack/react-query";
import cacheKey from "../../constant/cacheKey.ts";
import {api} from "../../constant/api.ts";

export default function useHardwareSchemaQuery() {
    const { readData } = useFetch();
    const { data } = useQuery({
        queryKey: [cacheKey.HARDWARE_SCHEMAS],
        queryFn: () => readData(api.hardwareSchema()),
        staleTime: 24 * 60 * 60 * 1000,
    });
    return { status: data?.status, schemas: data?.data };
}
