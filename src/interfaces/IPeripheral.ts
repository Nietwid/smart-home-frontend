export default interface IPeripheral {
    type: string;
    name: string;
    config: Record<string, unknown>;
    state: Record<string, unknown>;
}