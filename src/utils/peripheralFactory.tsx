import IPeripheral from "../interfaces/IPeripheral.ts";
import PinOutputWidget from "../components/Widgets/PinOutput/PinOutputWidget.tsx";
import RGBStripWidget from "../components/Widgets/RGBStrip/RGBStripWidget.tsx";
export default function peripheralFactory(peripheral:IPeripheral){
    switch(peripheral.name){
        case "pin_output":
            return <PinOutputWidget key={peripheral.id} {...peripheral}/>;
        case "pin_input":
            return null;
        case "pin_pwm":
            return null;
        case "rgb_strip":
            return <RGBStripWidget key={peripheral.id} {...peripheral}/>;
        default: return null;
    }
}