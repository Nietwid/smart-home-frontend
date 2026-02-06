import styles from "../../../pages/Settings/SettingsDevice/SettingsDevice.module.css";
import {Button, Input, InputGroup} from "rsuite";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import displayToaster from "../../../utils/displayToaster.tsx";
interface IChangeNameSettingsProps {
    name:string;
    updateMutation:{
        mutateAsync:(data:{name:string})=>Promise<any>;
    };
}
export default function ChangeNameSettings({name, updateMutation}:IChangeNameSettingsProps) {
    const { t } = useTranslation();
    const [deviceName, setDeviceName] = useState(name);
    const [isUpdating, setIsUpdating] = useState(false);
    const handleSaveName = async () => {
        if (!deviceName.trim()) {
            displayToaster(t("changeNameSettings.nameEmpty"),"warning")
            return;
        }
        setIsUpdating(true);
        try {
            await updateMutation.mutateAsync({ name: deviceName });
            displayToaster(t("settingsDevice.nameUpdated"))
        } catch (error) {
            displayToaster(t("settingsDevice.nameUpdateError"),"error")
        } finally {
            setIsUpdating(false);
        }
    };
    return(
        <div className={styles.configSection}>
            <label className={styles.configLabel}>📝{t("settingsDevice.deviceName")}</label>
            <div className={styles.nameSection}>
                <InputGroup className={styles.inputGroup}>
                    <Input
                        value={deviceName}
                        onChange={setDeviceName}
                        placeholder={t("settingsDevice.setDeviceName")}
                        size="lg"
                    />
                </InputGroup>
                <Button
                    appearance="primary"
                    size="lg"
                    onClick={handleSaveName}
                    loading={isUpdating}
                    className={styles.saveButton}
                >
                    {t("buttons.saveButton")}
                </Button>
            </div>
        </div>
    )
}