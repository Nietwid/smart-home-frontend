import styles from "./SvgIcon.module.css";
interface SvgIconProps {
    svgId: string;
    onClick?: () => void;
    className?: string;
}
import lamp from "../../../../public/static/svg/lamp.svg"
import fish from "../../../../public/static/svg/fish.svg"
import stairsIcon from "../../../../public/static/svg/stairsIcon.svg"
import temperature from "../../../../public/static/svg/temperature.svg"
import doorFront from "../../../../public/static/svg/doorFront.svg"
import threeDot from "../../../../public/static/svg/threeDot.svg"

const svgRepository={
    lamp:{svg:lamp,alt:"Lamp"},
    fish:{svg:fish,alt:"Fish"},
    stairsIcon:{svg:stairsIcon,alt:"Stairs"},
    temperature:{svg:temperature,alt:"Temperature"},
    doorFront:{svg:doorFront,alt:"Door"},
    threeDot:{svg:threeDot,alt:"ThreeDot"},
}
type SvgKey = keyof typeof svgRepository;
export default function SvgIcon({
    onClick,
    svgId,
    className,
}: SvgIconProps) {
    const safeKey = svgId as SvgKey;
    const item = svgRepository[safeKey] ?? { svg: fish, alt: "Fish" };
  return (
      <div className={styles.bubble}>
        <img
          src={item.svg}
          alt={item.alt}
          onClick={onClick}
          width="42"
          height="42"
          className={`${styles.icon} ${className}`}
        />
      </div>
  );
}
