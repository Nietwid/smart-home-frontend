import { useEffect, useState } from "react";
import { Form, Button, Panel, Message, useToaster } from "rsuite";
import useCameraMutation from "../../../hooks/queries/useCameraMutation.tsx";
import { ICameraCreate } from "../../../interfaces/ICamera.ts";
import { ICustomError } from "../../../interfaces/ICustomError.tsx";
import styles from "./AddCameraPage.module.css";
import displayToaster from "../../../utils/displayToaster.tsx";
import {useTranslation} from "react-i18next";

interface IError {
    name?: string;
    ip_address?: string;
    port?: string;
    username?: string;
    password?: string;
    path?: string;
}

export default function AddCameraPage() {
    const [formValue, setFormValue] = useState<ICameraCreate>({
        name: "",
        ip_address: "",
        port: "",
        username: "",
        password: "",
        path: "",
    });
    const [error, setError] = useState<IError>({});
    const { createCamera } = useCameraMutation();
    const mutation = createCamera();
    const {t} = useTranslation();
    useEffect(() => {
        if (mutation.isError) {
            const customError = mutation.error as ICustomError;
            if (customError.details) {
                setError(customError.details);
            }
        }
    }, [mutation.error]);

    const handleSubmit = () => {
        setError({});
        mutation.mutate(formValue, {
            onSuccess: () => {
                displayToaster(t("addCameraPage.success"))
                setFormValue({
                    name: "",
                    ip_address: "",
                    port: "",
                    username: "",
                    password: "",
                    path: "",
                });
            },
        });
    };

    return (
        <div className={styles.pageWrapper}>
            <Panel bordered shaded className={styles.panel}>
                <h3 className={styles.title}>{t("addCameraPage.title")}</h3>
                <p className={styles.subtitle}>{t("addCameraPage.subtitle")}</p>

                <Form fluid formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.ControlLabel>{t("addCameraPage.name")}</Form.ControlLabel>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder={t("addCameraPage.namePlaceholder")}
                            errorMessage={error?.name || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="ip_address">
                        <Form.ControlLabel>{t("addCameraPage.ipAddress")}</Form.ControlLabel>
                        <Form.Control
                            name="ip_address"
                            type="text"
                            placeholder={t("addCameraPage.ipAddressPlaceholder")}
                            errorMessage={error?.ip_address || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="port">
                        <Form.ControlLabel>{t("addCameraPage.port")}</Form.ControlLabel>
                        <Form.Control
                            name="port"
                            type="number"
                            placeholder={t("addCameraPage.portPlaceholder")}
                            errorMessage={error?.port || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="username">
                        <Form.ControlLabel>{t("addCameraPage.username")}</Form.ControlLabel>
                        <Form.Control
                            name="username"
                            type="text"
                            placeholder={t("addCameraPage.usernamePlaceholder")}
                            errorMessage={error?.username || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.ControlLabel>{t("addCameraPage.password")}</Form.ControlLabel>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder={t("addCameraPage.passwordPlaceholder")}
                            errorMessage={error?.password || undefined}
                        />
                    </Form.Group>

                    <Form.Group controlId="path">
                        <Form.ControlLabel>{t("addCameraPage.path")}</Form.ControlLabel>
                        <Form.Control
                            name="path"
                            type="text"
                            placeholder={t("addCameraPage.pathPlaceholder")}
                            errorMessage={error?.path || undefined}
                        />
                    </Form.Group>

                    <Button
                        appearance="primary"
                        type="submit"
                        loading={mutation.isPending}
                        block
                        className={styles.submitButton}
                    >
                        {t("addCameraPage.addButton")}
                    </Button>
                </Form>
            </Panel>
        </div>
    );
}