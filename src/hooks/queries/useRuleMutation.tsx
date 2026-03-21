import { useMutation } from "@tanstack/react-query";
import useFetch, {ApiError} from "../useFetch";
import { api } from "../../constant/api";

export default function useRuleMutation() {
    const { createData } = useFetch();
    function createRule() {
        return useMutation<any, ApiError, any>({
            mutationFn: (data: any) => createData(`${api.rule}`, data),
        });
    }

    return { createRule };
}
