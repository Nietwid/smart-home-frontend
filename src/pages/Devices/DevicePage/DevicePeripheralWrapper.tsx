import IPeripheral from "../../../interfaces/IPeripheral.ts";
import peripheralFactory from "../../../utils/peripheralFactory.tsx";
import styles from "./DevicePage.module.css"
interface IProps {
    peripherals: IPeripheral[];

}
export default function DevicePeripheralWrapper({peripherals}: IProps) {
    return <div className={styles.wrapper}>
        {peripherals.map((peripheral:IPeripheral) => peripheralFactory(peripheral))}
    </div>
}