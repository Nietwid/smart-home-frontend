import { api } from "../../constant/api";
import useFetch from "../useFetch";
import CacheKey from "../../constant/cacheKey.ts";
import {useQuery} from "@tanstack/react-query";

export default function useRfidCardQuery(peripheral_id:number) {
    const { readData } = useFetch();
    const { data, isLoading } = useQuery({
        queryFn: () => readData(`${api.rfidCard}${peripheral_id}`),
        queryKey: [CacheKey.RFID_CARDS, peripheral_id],
        staleTime: 10 * 60 * 1000,
        enabled: !!peripheral_id
    });
    return { status: data?.status, cards: data?.data, isLoading };
}
