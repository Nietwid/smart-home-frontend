import {useQuery} from "@tanstack/react-query";
import useFetch from "../../useFetch.tsx";
import cacheKey from "../../../constant/cacheKey.ts";
import {api} from "../../../constant/api.ts";
export default function useHardwareSchemaQuery(){
    const {readData} = useFetch();
    function getHardwareSchemasName(){
        return useQuery({
            queryKey: [cacheKey.SCHEMA_NAMES],
            queryFn: ()=> readData(api.hardwareSchema),
            staleTime: 10*60*1000
        })
    }
    function getHardwareSchema(name:string){
        return useQuery({
            queryKey: [cacheKey.SCHEMA_NAMES, name],
            queryFn: ()=> readData(`${api.hardwareSchema}?name=${name}`),
            staleTime: 10*60*1000
        })
    }
    return {getHardwareSchemasName,getHardwareSchema}
}