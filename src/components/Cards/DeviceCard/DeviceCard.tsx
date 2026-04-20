import ThreeDot from "../../ui/ThreeDot/ThreeDot.tsx";
import Header from "../../ui/Headers/Header/Header.tsx";
import SvgIcon from "../../ui/SvgIcon/SvgIcon.tsx";
import styles from "./DeviceCard.module.css";
interface IProps {
    id:number;
    name: string;
    isOnline: boolean;
    svgId:string;

}

export default function DeviceCard({id,isOnline,name,svgId,}:IProps){
    return<>
        <div className={styles.card}>
            <div className={styles.content}>
                <ThreeDot to={`/devices/${id}`} />
                <SvgIcon svgId={svgId} />
                <Header disable={!isOnline}>{name}</Header>
            </div>
        </div>
    </>
}