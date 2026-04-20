import { useParams } from "react-router-dom";
import { Divider } from "rsuite";
import PageContainer from "../../../components/ui/PageContainer/PageContainer";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader";
import {useTranslation} from "react-i18next";
import styles from "./SettingsCamera.module.css"
import ContainerSettings from "../../../components/Settings/ContainerSettings/ContainerSettings.tsx";
import ChangeNameSettings from "../../../components/Settings/ChangeNameSettings/ChangeNameSettings.tsx";
import useCameraMutation from "../../../hooks/queries/useCameraMutation.tsx";
import useCameraQuery from "../../../hooks/queries/useCameraQuery.tsx";
import ToggleFavourite from "../../../components/Settings/ToggleFavourite/ToggleFavourite.tsx";
import DeleteSettings from "../../../components/Settings/DeleteSettings/DeleteSettings.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";

export default function SettingsCamera() {
    const params = useParams();
    const id = parseInt(params.id || "0");
    const {cameraData} = useCameraQuery(id);
    const {updateCamera, deleteCamera} = useCameraMutation();
    const updateMutation = updateCamera(id);
    const deleteMutation = deleteCamera(id);
    const { t } = useTranslation();
    if (!cameraData) {
        return <LoadingAnimation size="xlarge" type="spinner" glow={true} />;
    }

    return (
        <PageContainer className={styles.container}>
            <PageHeader title={t("camera.settingsTitle")}>
            </PageHeader>
            <div className={styles.content}>
                <ContainerSettings title={t("camera.settingsConfig")} icon={"⚙️"}>
                    <ChangeNameSettings name={cameraData.name} updateMutation={updateMutation}/>
                    <Divider className={styles.divider} />
                    <ToggleFavourite id={cameraData.id} type={"camera"}/>
                </ContainerSettings>
                <ContainerSettings title={t("settingsDevice.actions")} icon={"🛠️"}>
                    <DeleteSettings mutation={deleteMutation}/>
                </ContainerSettings>
            </div>
        </PageContainer>
    );
}