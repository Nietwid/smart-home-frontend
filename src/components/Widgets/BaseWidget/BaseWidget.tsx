import {Center, Stack} from "rsuite";
import styles from "./BaseWidget.module.css";

interface Props {
    children: React.ReactNode;
    name?: string;
    w?: number;
    h?: number;
    className?: string;
}

export default function BaseWidget({ name, children, w = 1, h = 1, className = '' }: Props) {
    return (
        <Center
            className={`${styles.widget} ${className}`}
            style={{
                '--col-span': w,
                '--row-span': h,
            } as React.CSSProperties}
        >
            {name && <p className={styles.name}>{name}</p>}
            <Stack
                direction="column"
                spacing={10}
                justifyContent="center"
                alignItems="center"
                style={{ width: '100%', height: '100%' }}
            >
                {children}
            </Stack>
        </Center>
    );
}