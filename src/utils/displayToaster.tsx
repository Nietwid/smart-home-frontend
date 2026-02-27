import {Message, toaster} from "rsuite";
import {PlacementType} from "rsuite/esm/toaster/ToastContainer";
type MessageStatus = "info" | "success" |"warning" | "error";

export default function displayToaster(message:string, type:MessageStatus="success", placement:PlacementType="topCenter",duration=3000) {
    toaster.push(
        <Message closable type={type} showIcon >
            {message}
        </Message>,
        { placement, duration }
    );
}