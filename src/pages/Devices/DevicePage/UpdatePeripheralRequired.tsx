import { Button } from "rsuite";
import SyncType from "../../../constant/syncType.ts";
import NoticeIcon from '@rsuite/icons/Notice';
import styles from './UpdatePeripheralRequired.module.css';
import {useTranslation} from "react-i18next";

interface IProps {
    onClick: (type: SyncType) => void;
    pending: boolean;
}

export default function UpdatePeripheralRequired({ onClick, pending }: IProps) {
    const {t} = useTranslation();
    return (
        <div className={styles.updateContainer}>
            <div className={styles.updateContent}>
                <div className={styles.pulseIconWrapper}>
                    <NoticeIcon style={{ fontSize: 60, color: '#ff922b' }} />
                </div>

                <div>
                    <h2 className={styles.updateTitle}>
                        {t("updatePeripheralRequired.syncRequired")}
                    </h2>
                    <p className={styles.updateDescription}>
                        {t("updatePeripheralRequired.message")}
                    </p>
                </div>

                <Button
                    appearance="primary"
                    color="orange"
                    className={styles.updateButton}
                    loading={pending}
                    onClick={() => onClick(SyncType.PERIPHERAL)}
                >
                    {pending ? t("updatePeripheralRequired.buttonUpdating"):t("updatePeripheralRequired.buttonStart")}
                </Button>
            </div>
        </div>
    );
}