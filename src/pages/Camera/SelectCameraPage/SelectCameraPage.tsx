import styles from './SelectCameraPage.module.css'
import PageContainer from "../../../components/ui/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import useCamerasQuery from "../../../hooks/queries/useCamerasQuery.tsx";
import {useEffect, useState} from "react";
import {ICamera} from "../../../interfaces/ICamera.ts";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import DeviceActionPanel from "../../../components/DeviceActionPanel/DeviceActionPanel.tsx";
import {useTranslation} from "react-i18next";
import CameraCardHls from "../../../components/Cards/CameraCard/Hls/CameraCardHls.tsx";

export default function SelectCameraPage() {
    const {cameraData,status, isLoading} = useCamerasQuery();
    const [cameras, setCameras] = useState<ICamera[]>([]);
    const {t} = useTranslation();

    useEffect(() => {
        if (cameraData && status === 200) {
            setCameras(cameraData);
        }
    }, [cameraData]);
    return(
        <PageContainer>
            <PageHeader title={t("camera.title")}>
                <DeviceActionPanel
                    buttons={[
                        {
                            label: t("camera.addButton"),
                            to: `add/`,
                            type: "primary",
                            tooltip: t("camera.addTooltip")
                        },
                    ]}
                    showWifi={false}
                />
            </PageHeader>

            {isLoading ? (
                <LoadingAnimation size="xlarge" type="spinner" glow={true} />
            ) : (
                <div className={styles.container}>
                    {cameras?.map((camera) => (
                        <CameraCardHls key={camera.id} id={camera.id} name={camera.name} />
                    ))}
                </div>
            )}
        </PageContainer>
    )
}
