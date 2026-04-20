import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch, {ApiError} from "../../useFetch.tsx";
import {api} from "../../../constant/api.ts";
import updateRoomData from "../../../utils/updateRoomData.tsx";
import CacheKey from "../../../constant/cacheKey.ts";
import {IRoom, IRoomAddData, IRoomUpdate} from "../../../interfaces/IRoom.tsx";
import {CreateApiResponse, DeleteApiResponse, UpdateApiResponse} from "../../../type/TApiResponse.ts";



export default function useRoomMutation(){
    const {createData, updateData, deleteData} = useFetch()
    const queryClient = useQueryClient();

    function createRoom(onSuccess: () => void){
        return  useMutation<CreateApiResponse<any>, ApiError, IRoomAddData>({
            mutationFn: (roomData) => createData(api.room(), roomData),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CacheKey.ROOMS] });
                onSuccess();
            },
        });
    }
    function updateRoom(id: number){
        return useMutation<UpdateApiResponse<any>, ApiError, IRoomUpdate>({
            mutationFn:(data:IRoomUpdate) => updateData(api.room(id), data),
            onSuccess: (response) => {
                updateRoomData(queryClient, response);
            }
        })
    }
    function deleteRoom(id: number){
        return useMutation<DeleteApiResponse, ApiError, IRoomUpdate>({
            mutationFn: () => deleteData(api.room(id)),
            onSuccess: (_:{status: number}) => {
                const rooms = queryClient.getQueryData([CacheKey.ROOMS]) as {status: number, data: IRoom[]} | undefined;
                if(!rooms) return;
                const newRooms = rooms.data.filter(room => room.id !== id);
                queryClient.setQueryData([CacheKey.ROOMS], {...rooms, data: newRooms});
            }
        })
    }

    return {createRoom, updateRoom, deleteRoom}
}