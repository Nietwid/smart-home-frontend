import styles from './ThreeDot.module.css'
import {Link} from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon.tsx";

interface ThreeDotProps {
    to:string
    className?:string
}

export default function ThreeDot({to, className}:ThreeDotProps) {
    return <Link to={to} className={`${styles.link} ${className}`}>
      <SvgIcon svgId={"threeDot"} className={styles.size}/>
    </Link>

}