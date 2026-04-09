import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IAht10Widget} from "../../../interfaces/Widgets/IAht10.ts";
import {Button} from "rsuite";
import WavePointIcon from '@rsuite/icons/WavePoint';
import styles from './Aht10Widget.module.css';
import {useState} from "react";
import {useTranslation} from "react-i18next";
import Aht10HistoryManager from "./Aht10HistoryManager/Aht10HistoryManager.tsx";
export default function Aht10Widget({id, state, config}:IAht10Widget) {
    const [showHistory, setShowHistory] = useState(false);
    const {t} = useTranslation();


    return (
        <BaseWidget name={config?.name} size="lg" ratio="2/1">
            <div className={styles.container}>
                <div className={styles.dataGrid}>
                    <div className={styles.dataItem}>
                        <span className={styles.label}>{t("tempHumWidget.temperature")}</span>
                        <span className={styles.value}>
                            {state?.temperature?.toFixed(1) ?? "--"}
                            <span className={styles.unit}>°C</span>
                        </span>
                    </div>

                    <div className={styles.dataItem}>
                        <span className={styles.label}>{t("tempHumWidget.humidity")}</span>
                        <span className={styles.value}>
                            {state?.humidity?.toFixed(1) ?? "--"}
                            <span className={styles.unit}>%</span>
                        </span>
                    </div>
                </div>

                <div className={styles.footer}>
                    {/*<span className={styles.lastUpdate}>*/}
                    {/*    {t("tempHumWidget.lastUpdate")} 12.01 12:00:00*/}
                    {/*</span>*/}

                    <Button
                        className={styles.managerButton}
                        appearance="subtle"
                        startIcon={<WavePointIcon />}
                        onClick={() => setShowHistory(true)}
                    >
                        {t("tempHumWidget.historicalData")}
                    </Button>
                </div>
            </div>

            <Aht10HistoryManager
                id={id}
                open={showHistory}
                onClose={()=>setShowHistory(false)}
            />
        </BaseWidget>
    )
}