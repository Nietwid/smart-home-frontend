import { Button, Stack, Whisper, Tooltip, IconButton } from "rsuite";
import { Link } from "react-router-dom";
import WifiStrength from "../ui/WiFiStrength/WiFiStrength.tsx";
import styles from "./DeviceActionPanel.module.css";

interface ActionButton {
    label: string;
    to: string;
    type?: "default" | "primary" | "link" | "subtle" | "ghost";
    color?: "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "violet";
    tooltip?: string;
    icon?: React.ReactNode; // Dodaliśmy obsługę ikon
}

interface DeviceActionPanelProps {
    buttons?: ActionButton[];
    wifiStrength?: number;
    showWifi?: boolean;
    children?: React.ReactNode;
}

export default function DeviceActionPanel({ buttons, wifiStrength, children, showWifi = true }: DeviceActionPanelProps) {
    return (
        <div className={styles.wrapper}>
            <Stack
                className={styles.container}
                justifyContent="space-between"
                wrap
                spacing={20}
            >
                <Stack spacing={10} wrap>
                    {buttons?.map((btn, idx) => {
                        const buttonElement = (
                            <Button
                                key={`dap_button_${idx}`}
                                as={Link}
                                forgetProp={undefined}
                                to={btn.to}
                                appearance={btn.type || "subtle"}
                                color={btn.color}
                                startIcon={btn.icon}
                                className={styles.actionButton}
                            >
                                {btn.label}
                            </Button>
                        );

                        return btn.tooltip ? (
                            <Whisper
                                key={idx}
                                placement="top"
                                trigger="hover"
                                speaker={<Tooltip>{btn.tooltip}</Tooltip>}
                            >
                                {buttonElement}
                            </Whisper>
                        ) : (
                            buttonElement
                        );
                    })}
                    {children}
                </Stack>

                {showWifi && wifiStrength !== undefined && (
                    <Stack spacing={10} className={styles.statusSection}>
                        <div className={styles.wifiWrapper}>
                            <WifiStrength strength={wifiStrength} size="medium" />
                            <span className={styles.wifiLabel}>
                                {wifiStrength > -100 ? `${wifiStrength} dBm` : 'Offline'}
                            </span>
                        </div>
                    </Stack>
                )}
            </Stack>
        </div>
    );
}