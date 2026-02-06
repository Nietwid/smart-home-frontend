import {Toggle} from "rsuite";
import styles from "./ToggleFavourite.module.css";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import displayToaster from "../../../utils/displayToaster.tsx";
import useFavouriteMutation from "../../../hooks/queries/useFavouriteMutation.tsx";
import isFavourite from "../../../utils/isFavourite.ts";
import {useQueryClient} from "@tanstack/react-query";

interface IToggleFavouriteProps {
    id:number;
    type:"device"|"camera"|"room";
}
export default function ToggleFavourite({ id, type }:IToggleFavouriteProps) {
    const favouriteMutation = useFavouriteMutation()
    const {t} = useTranslation();
    const queryClient = useQueryClient();
    const isFavouriteSelected = isFavourite(id,queryClient,"camera")
    const [isSetFavourite, setIsSetFavourite] = useState(isFavouriteSelected);
    const handleFavouriteToggle = async (checked: boolean) => {
        setIsSetFavourite(checked);
        try {
            await favouriteMutation.mutateAsync({id: id, is_favourite: !checked, type:type});
            displayToaster(checked ? t("settingsDevice.favouriteAdded") : t("settingsDevice.favouriteRemoved"))
        } catch (error) {
            displayToaster(t("settingsDevice.favouriteError"),"error")
            setIsSetFavourite(isFavouriteSelected);
        }
    };
    return(
        <div className={styles.configSection}>
            <div className={styles.toggleSection}>
                <div className={styles.toggleInfo}>
                    <label className={styles.configLabel}>⭐{t("settingsDevice.favourite")}</label>
                    <p className={styles.configDesc}>
                        {t("settingsDevice.favouriteDescription")}
                    </p>
                </div>
                <Toggle
                    checked={isSetFavourite}
                    onChange={handleFavouriteToggle}
                    size="lg"
                    checkedChildren={t("settingsDevice.yes")}
                    unCheckedChildren={t("settingsDevice.no")}
                />
            </div>
        </div>
    )
}