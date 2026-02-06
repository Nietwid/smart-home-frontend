import {QueryClient} from "@tanstack/react-query";
import CacheKey from "../constant/cacheKey.ts";

export default function isFavourite(id: number, queryClient:QueryClient, type:string) {
    const favourites = queryClient.getQueryData([CacheKey.FAVOURITES]) as { status: number; data: { devices: number[], rooms: number[], cameras: number[]} };
    if (!favourites) return false;
    if (type === "room") {
        return favourites.data.rooms.some(favourite => favourite === id);
    }else if (type === "device") {
        return favourites.data.devices.some(favourite => favourite === id);
    }else if (type === "camera") {
        return favourites.data.cameras.some(favourite => favourite === id);
    }
    return false;
}