import {Button} from "rsuite";
import styles from "../../../../pages/StairsPage/StairsPage.module.css";
import {useTranslation} from "react-i18next";
interface Props {
    loading: boolean;
    onSave?: () => void;

}
export default function ButtonSave({loading, onSave}: Props) {
    const {t}=useTranslation();
    return (
        <Button
            appearance="primary"
            size="lg"
            loading={loading}
            onClick={onSave}
            className={styles.saveButton}
        >
            💾 {t("buttons.saveButton")}
        </Button>
    )
}