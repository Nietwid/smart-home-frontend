import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";
import CacheKey from "../../constant/cacheKey.ts";

export default function useCardMutation() {
  const { deleteData } = useFetch();
  const queryClient = useQueryClient();
  function mutationDelete(peripheralId:number, cardId: number) {
    return useMutation({
      mutationFn: () => deleteData(api.rfidCardDetail(peripheralId,cardId)),
      onSuccess: () => {queryClient.invalidateQueries({
        queryKey: [CacheKey.RFID_CARDS, peripheralId]
      });},
    });
  }

  return { mutationDelete };
}
