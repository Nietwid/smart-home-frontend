import IPeripheral from "../interfaces/IPeripheral.ts";
import PinOutputWidget from "../components/Widgets/PinOutput/PinOutputWidget.tsx";
export default function peripheralFactory(peripheral:IPeripheral){
    switch(peripheral.name){
        case "pin_output":
            return <PinOutputWidget key={peripheral.id} {...peripheral}/>;
        case "pin_input":
            return null;
        case "pin_pwm":
            return null;
        case "rgb_strip":
            return null;
        default: return null;
    }
}