export default interface IPeripheral<TConfig = unknown, TState = unknown> {
    id: number;
    name: string;
    device:number;
    pending:string[];
    config: TConfig;
    state: TState;
}