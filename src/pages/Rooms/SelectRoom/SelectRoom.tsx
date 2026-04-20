import { useState,useEffect } from "react";

import { IRoom } from "../../../interfaces/IRoom.tsx";

import AddRoom from "../../../components/AddRoom/AddRoom.tsx";

import RoomCard from "../../../components/Cards/RoomCard/RoomCard.tsx";

import usePrefetchRoomQuery from "../../../hooks/queries/room/usePrefetchRoomQuery.tsx";
import LoadingAnimation from "../../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../../components/ui/PageContainer/PageContainer.tsx";
import PageHeader from "../../../components/ui/Headers/PageHeader/PageHeader.tsx";
import styles from "./SelectRoom.module.css";
import {Button} from "rsuite";
import {useTranslation} from "react-i18next";

export default function SelectRoom() {
    const [dataToDisplay, setDataToDisplay] = useState<IRoom[]>([]);
    const [openAddRoom, setOpenAddRoom] = useState<boolean>(false);
    const { roomData } = usePrefetchRoomQuery()
    const {t} = useTranslation();
    useEffect(() => {
        if (!roomData) return;
        setDataToDisplay(roomData);
    }, [roomData]);

    if (!roomData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
        return (
        <PageContainer>
          <PageHeader title={t("selectRoom.title")} className={styles.header}>
              <div className={styles.buttonContainer}>
                  <Button
                      appearance="default"
                      onClick={() => setOpenAddRoom(true)}
                      className={styles.addButton}
                  >
                      {t("button.add")}
                  </Button>
              </div>
          </PageHeader>
          <AddRoom show={openAddRoom} onClose={() => setOpenAddRoom(false)} />
            <div className={styles.cardContainer}>
                {dataToDisplay.map((room: IRoom) => (
                    <RoomCard room={room} key={room.id} />
                ))}
            </div>
        </PageContainer>
    );
}
