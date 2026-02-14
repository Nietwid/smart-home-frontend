export default interface IPeripheral {
    id:number;
    type: string;
    name: string;
    config: Record<string, unknown>;
    state: Record<string, unknown>;
}