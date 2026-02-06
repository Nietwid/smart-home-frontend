import {Panel} from "rsuite";
import styles from "./ContainerSettings.module.css";
interface ContainerSettingsProps {
    children: React.ReactNode
    icon?:string
    title?:string
}
export default function ContainerSettings({title, icon, children}: ContainerSettingsProps) {
   return <Panel
       header={
           <div className={styles.panelHeader}>
               <span className={styles.panelIcon}>{icon}</span>
               <span className={styles.panelTitle}>{title}</span>
           </div>
       }
       bordered
       className={styles.panel}
   >
       {children}
   </Panel>
}