import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IPirSensorWidget} from "../../../interfaces/Widgets/IPirSensorWidget.ts";
import { Stack } from 'rsuite';
import EyeIcon from '@rsuite/icons/Visible';
import EyeOffIcon from '@rsuite/icons/Unvisible';
import styles from './PirSensorWidget.module.css';

export default function PirSensorWidget({ state, config }: IPirSensorWidget) {
    const isMotion = state.is_on;

    return (
        <BaseWidget name={config.name} size="md">
            <div className={styles.container}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={10} style={{ height: '100%' }}>
                    <div className={`${styles.statusCircle} ${isMotion ? styles.motionDetected : ''}`}>
                        {isMotion ? (
                            <EyeIcon className={styles.icon} />
                        ) : (
                            <EyeOffIcon className={styles.icon} />
                        )}
                    </div>
                </Stack>
            </div>
        </BaseWidget>
    );
}