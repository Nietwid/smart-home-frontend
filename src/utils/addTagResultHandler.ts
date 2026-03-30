import {QueryClient} from "@tanstack/react-query";
import MessageType from "../constant/message_type.ts";
import CacheKey from "../constant/cacheKey.ts";

type Data = {
    status: number
    intent_id: string
    card_name: string
    peripheral_id: number

}
export default function addTagResultHandler(queryClient: QueryClient, data:Data) {
    if (!data) return;
    if (data.status === 201){
        queryClient.invalidateQueries({queryKey:[CacheKey.RFID_CARDS, data.peripheral_id]})
    }
    window.dispatchEvent(new CustomEvent(MessageType.ADD_TAG_RESULT, {detail: data}));
}