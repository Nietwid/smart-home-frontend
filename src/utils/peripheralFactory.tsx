import IPeripheral from "../interfaces/IPeripheral.ts";
import PinOutputWidget from "../components/Widgets/PinOutput/PinOutputWidget.tsx";
import RGBStripWidget from "../components/Widgets/RGBStrip/RGBStripWidget.tsx";
import PinInput from "../components/Widgets/PinInput/PinInput.tsx";
import SequentialLightWidget from "../components/Widgets/SequentialLight/SequentialLightWidget.tsx";
import Rc522 from "../components/Widgets/Rc522/Rc522.tsx";
import Aht10Widget from "../components/Widgets/Aht10Widget/Aht10Widget.tsx";

export default function peripheralFactory(peripheral:IPeripheral){
    switch(peripheral.name){
        case "pin_output":
            return <PinOutputWidget key={peripheral.id} {...peripheral}/>;
        case "pin_input":
            return <PinInput key={peripheral.id} {...peripheral}/>;
        case "pin_pwm":
            return null;
        case "rgb_strip":
            return <RGBStripWidget key={peripheral.id} {...peripheral}/>;
        case "sequential_light":
            return <SequentialLightWidget key={peripheral.id} {...peripheral}/>;
        case "rc522":
            return <Rc522 key={peripheral.id} {...peripheral}/>;
        case "aht10":
            return <Aht10Widget key={peripheral.id} {...peripheral}/>;
        default: return null;
    }
}