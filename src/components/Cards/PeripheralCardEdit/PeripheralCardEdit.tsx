import IPeripheral from "../../../interfaces/IPeripheral.ts";

export default function PeripheralCardEdit({name, type, config }:IPeripheral){

    return <div>
        <p>{name}</p>
        <p>{type}</p>
        <p>{Object.entries(config).map(([key,value])=> <p>{key}:{value as any}</p>)}</p>
    </div>
}