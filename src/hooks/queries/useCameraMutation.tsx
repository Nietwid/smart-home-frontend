import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "../useFetch.tsx";
import {api} from "../../constant/api.ts";
import {ICameraCreate} from "../../interfaces/ICamera.tsx";
import CacheKey from "../../constant/cacheKey.ts";


export default function useCameraMutation(){
    const {createData, updateData, deleteData} = useFetch()
    const queryClient = useQueryClient();
    function createCamera(){
        return useMutation({
            mutationFn:(data:ICameraCreate) => createData(api.cameras, data),
            onSuccess: (_) => {
                queryClient.invalidateQueries({ queryKey: [CacheKey.CAMERAS] });
            }
        })
    }
    function updateCamera(id: number){
        return useMutation({
            mutationFn: (data:object) => updateData(`${api.cameras}${id}`,data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CacheKey.CAMERAS] });
                queryClient.invalidateQueries({ queryKey: [CacheKey.CAMERAS, id] });
            }
        })
    }
    function deleteCamera(id: number){
        return useMutation({
            mutationFn: () => deleteData(`${api.cameras}${id}`),
            onSuccess: () => {
            }
        })
    }

    return {createCamera, updateCamera, deleteCamera}
}