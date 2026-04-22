import {useMemo} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import IMetricSeries from "../../interfaces/IMetricSeries.ts";
import styles from "./MetricChart.module.css"
import {Stack, Text} from "rsuite";
import {useTranslation} from "react-i18next";
import convertUtcToTimezone from "../../utils/convertUtcToTimezone.ts";

function prepareDynamicData(series: IMetricSeries[]) {
    const dataMap: { [key: string]: any } = {};
    series.forEach(s => {
        s.data?.forEach(item => {
            const ts = convertUtcToTimezone(item.timestamp);
            if (!dataMap[ts]) dataMap[ts] = { timestamp: ts};
            dataMap[ts][s.key] = item.value.toFixed(2);
        });
    });

    return Object.values(dataMap).sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}
interface IProps {
    series: IMetricSeries[];
}

export default function MetricChart({ series }: IProps) {
    const chartData = useMemo(() => prepareDynamicData(series), [series]);
    const hasLeftAxis = series.some(s => s.yAxisSide === 'left' && s.data?.length > 1);
    const hasRightAxis = series.some(s => s.yAxisSide === 'right' && s.data?.length > 1);
    const {t} = useTranslation();
    if (! hasLeftAxis && ! hasRightAxis) return (
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={styles.emptyContainer}
        spacing={10}
    >
        <Text >
            {t("measurementHistoryManager.noDataTitle")}
        </Text>
        <Text >
            {t("measurementHistoryManager.noData")}
        </Text>
    </Stack>
    )

    return (
        <div >
            <ResponsiveContainer width="100%" height={300} className={styles.chart}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="timestamp"
                        interval="preserveStartEnd"
                        minTickGap={30}
                        stroke="#aaa"
                    />

                    {hasLeftAxis && (
                        <YAxis yAxisId="left" orientation="left" stroke="#aaa" />
                    )}

                    {hasRightAxis && (
                        <YAxis yAxisId="right" orientation="right" stroke="#aaa" />
                    )}

                    <Tooltip
                        contentStyle={{ backgroundColor: '#222', border: 'none' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <Legend />

                    {series.map(s => (
                        s.data?.length > 1 && (
                            <Line
                                key={s.key}
                                yAxisId={s.yAxisSide}
                                type="monotone"
                                dataKey={s.key}
                                name={s.label}
                                stroke={s.color}
                                strokeWidth={2}
                                dot={false}
                                connectNulls
                            />
                        )
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}