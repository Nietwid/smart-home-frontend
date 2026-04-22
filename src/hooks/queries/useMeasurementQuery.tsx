import { useQuery } from "@tanstack/react-query";
import useFetch, {ApiError} from "../useFetch.tsx";
import {api} from "../../constant/api.ts";
import CacheKey from "../../constant/cacheKey.ts";
import {ReadApiResponse} from "../../type/TApiResponse.ts";

interface IAggregationData {
    avg:number,
    min:number,
    max:number,
}

interface IChartData {
    value:number,
    timestamp:string,
}

interface IMeasurement {
    aggregation_data:IAggregationData,
    chart_data:IChartData[],
}

export default function useMeasurementQuery(
    id: number,
    event:string,
    start:Date,
    end:Date,
    run:boolean=false
) {
    const { readData } = useFetch();
    const { data } = useQuery<ReadApiResponse<IMeasurement>, ApiError>({
        queryKey: [CacheKey.MEASUREMENT, id, event, start, end],
        queryFn: () => readData(api.measurement(id, event, start.toISOString(), end.toISOString())),
        staleTime: 10 * 60 * 1000,
        enabled: run
    });
    return { status: data?.status, data: data?.data };
}
