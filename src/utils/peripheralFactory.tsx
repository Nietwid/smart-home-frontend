import IPeripheral from "../interfaces/IPeripheral.ts";
import PinOutputWidget from "../components/Widgets/PinOutput/PinOutputWidget.tsx";
import RGBStripWidget from "../components/Widgets/RGBStrip/RGBStripWidget.tsx";
import PinInput from "../components/Widgets/PinInput/PinInput.tsx";
import SequentialLightWidget from "../components/Widgets/SequentialLight/SequentialLightWidget.tsx";
import Rc522 from "../components/Widgets/Rc522/Rc522.tsx";
import Aht10Widget from "../components/Widgets/Aht10Widget/Aht10Widget.tsx";
import BistableButtonWidget from "../components/Widgets/ButtonBistableWidget/ButtonBistableWidget.tsx"
import ButtonMonostableWidget from "../components/Widgets/ButtonMonostableWidget/ButtonMonostableWidget.tsx";
import PinPwmWidget from "../components/Widgets/PinPwmWidget/PinPwmWidget.tsx";
import PirSensorWidget from "../components/Widgets/PirSensorWidget/PirSensorWidget.tsx";

export default function peripheralFactory(peripheral:IPeripheral){
    console.log(peripheral.name)
    switch(peripheral.name){
        case "pin_output":
            return <PinOutputWidget key={peripheral.id} {...peripheral}/>;
        case "pin_input":
            return <PinInput key={peripheral.id} {...peripheral}/>;
        case "button_bistable":
            return <BistableButtonWidget key={peripheral.id} {...peripheral}/>;
        case "button_monostable":
            return <ButtonMonostableWidget key={peripheral.id} {...peripheral}/>;
        case "pin_pwm":
            return <PinPwmWidget key={peripheral.id} {...peripheral}/>;
        case "active_buzzer":
            return null;
        case "pca9685":
            return null;
        case "pir_sensor":
            return <PirSensorWidget key={peripheral.id} {...peripheral}/>;
        case "relay":
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