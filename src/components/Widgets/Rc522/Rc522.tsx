import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {IRc522Widget} from "../../../interfaces/Widgets/IRc522.ts";

import CardManager from "./CardManager/CardManager.tsx";
import {useState} from "react";
import {Button} from "rsuite";


export default function Rc522({id, state, config, pending}:IRc522Widget){
    const [showCardManager, setShowCardManager] = useState(false);
    return (
        <BaseWidget name={config?.name} size="md">
            <Button onClick={()=>setShowCardManager(true)}>CARD</Button>

            <CardManager id={id} pending={pending.includes("add_tag")} open={showCardManager} onClose={() => setShowCardManager(false)} />
        </BaseWidget>
    );
}