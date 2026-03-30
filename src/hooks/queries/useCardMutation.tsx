import { useMutation } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "../../constant/api";

export default function useCardMutation() {
  const { deleteData } = useFetch();

  function mutationDelete(cardId: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.card}${cardId}/`),
    });
  }

  return { mutationDelete };
}
