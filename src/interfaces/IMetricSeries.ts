interface IData {
    timestamp: string;
    value: number;
}
export default interface IMetricSeries {
    key: string;
    data: IData[];
    color: string;
    label: string;
    yAxisSide: 'left' | 'right';
}

