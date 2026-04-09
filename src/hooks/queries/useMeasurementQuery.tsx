import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch.tsx";
import {api} from "../../constant/api.ts";

export default function useMeasurementQuery(
    id: number,
    event:string,
    start:Date,
    end:Date,
    run:boolean=false
) {
    const { readData } = useFetch();
    const { data } = useQuery({
        queryKey: ["measurement", id, event, start, end],
        queryFn: () => readData(api.measurement(id, event, start.toISOString(), end.toISOString())),
        staleTime: 10 * 60 * 1000,
        enabled: run
    });
    return { status: data?.status, data: data?.data };
}
