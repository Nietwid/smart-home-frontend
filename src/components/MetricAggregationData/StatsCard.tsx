import {Card} from "rsuite";
import styles from "./StatsCard.module.css";
interface IStatCardProps {
    title: string;
    value: number | null | undefined;
    unit: string;
    color: string;
}
export default function StatCard({ title, value, unit, color }: IStatCardProps) {
    return (
        <Card size="sm">
            <Card.Header>
                <span className={styles.title}>{title}</span>
            </Card.Header>
            <Card.Body>
                <span className={styles.value} style={{ color }}>
                    {typeof value === 'number' ? value.toFixed(1) : '--'}
                </span>
                <span className={styles.unit}>{unit}</span>
            </Card.Body>
        </Card>
    );
}