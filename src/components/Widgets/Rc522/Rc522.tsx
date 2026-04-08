import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IRc522Widget} from "../../../interfaces/Widgets/IRc522.ts";
import GearIcon from '@rsuite/icons/Gear';
import CardManager from "./CardManager/CardManager.tsx";
import {useState, useMemo} from "react";
import {Button} from "rsuite";
import DEVICE_PENDING from "../../../enums/device_pending.ts"
import useRfidCardQuery from "../../../hooks/queries/useRfidCardQuery.tsx";
import styles from "./Rc522.module.css";
import {useTranslation} from "react-i18next";

export default function Rc522({id, state, config, pending}:IRc522Widget){
    const { t } = useTranslation();
    const [showCardManager, setShowCardManager] = useState(false);
    const isAddingCard = pending.includes(DEVICE_PENDING.ADD_TAG);
    const {cards} = useRfidCardQuery(id)

    const lastUsedCard = useMemo(() => {
        if (!cards || !cards.length) return null;
        return [...cards].sort((a, b) =>
            new Date(b.last_used).getTime() - new Date(a.last_used).getTime()
        )[0];
    }, [cards]);

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], {day:'2-digit',month:'2-digit',year:'2-digit', hour: '2-digit', minute: '2-digit' });
    };
    return (
        <BaseWidget name={config?.name} size="md">
            <div className={styles.container}>
                <div className={styles.infoSection}>
                    {lastUsedCard && (
                        <>
                            <span className={styles.lastCardName}>{lastUsedCard.name}</span>
                            <span className={styles.lastAccess}>{formatTime(lastUsedCard.last_used)}</span>
                        </>
                    )}
                    {!lastUsedCard && !isAddingCard && <span> {t("rfidCard.noCard")}</span>}
                    {isAddingCard && <span className={styles.pairing}> {t("rfidCard.parsing")}</span>}
                </div>

                <Button
                    className={styles.managerButton}
                    appearance="subtle"
                    startIcon={<GearIcon />}
                    onClick={() => setShowCardManager(true)}
                >
                    {t("rfidCard.cardManagerButton")}
                </Button>

            </div>
            <CardManager
                id={id}
                pending={isAddingCard}
                open={showCardManager}
                onClose={() => setShowCardManager(false)}
            />
        </BaseWidget>
    );
}