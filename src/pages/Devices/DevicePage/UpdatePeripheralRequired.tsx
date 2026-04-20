import {Button} from "rsuite";
import SyncType from "../../../constant/syncType.ts";

interface IProps {
    onClick: (type:SyncType) => void;
}

export default function UpdatePeripheralRequired({onClick}:IProps){
    return <Button onClick={()=>onClick(SyncType.PERIPHERAL)}>UPDATE</Button>
}