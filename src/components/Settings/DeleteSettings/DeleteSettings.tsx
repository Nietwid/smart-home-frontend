import styles from "../../../pages/Settings/SettingsDevice/SettingsDevice.module.css";
import {Button} from "rsuite";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import ConfirmDeleteModal from "../../ConfirmDelete/ConfirmDelete.tsx";
import displayToaster from "../../../utils/displayToaster.tsx";
import {useNavigate} from "react-router-dom";

interface IDeleteSettingsProps {
    mutation:{
        mutateAsync:()=>Promise<any>;
    };
}

export default function DeleteSettings({mutation}:IDeleteSettingsProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleDeleteDevice = async () => {
        setShowDeleteModal(false);
        try {
            await mutation.mutateAsync();
            displayToaster(t("settingsDevice.deleteSuccess"))
            navigate("/device");
        } catch (error) {
            displayToaster(t("settingsDevice.deleteError"),"error")
        }
    };
    return (
        <div className={styles.actionItem}>
            <div className={styles.actionInfo}>
                <h4 className={styles.actionTitle}>🗑️ {t("settingsDevice.deleteDevice")}</h4>
                <p className={styles.actionDesc}>
                    {t("settingsDevice.deleteWarning")}
                </p>
            </div>
            <Button
                appearance="ghost"
                color="red"
                size="lg"
                onClick={() => setShowDeleteModal(true)}
                className={styles.deleteButton}
            >
                {t("settingsDevice.deleteDevice")}
            </Button>
            <ConfirmDeleteModal show={showDeleteModal} onConfirm={handleDeleteDevice} onCancel={()=>setShowDeleteModal(false)}/>
        </div>
    )
}

