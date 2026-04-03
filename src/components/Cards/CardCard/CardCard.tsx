import { ICard } from "../../../interfaces/IRfid";
import { useState } from "react";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";
import useCardMutation from "../../../hooks/queries/useCardMutation";
import {Card,Text} from "rsuite";
import DeleteIcon from "/static/svg/delete.svg";
import styles from "./CardCard.module.css";
import formatDate from "../../../utils/formatDate.tsx";
import {useTranslation} from "react-i18next";

interface CardCardProps {
  card: ICard;
  peripheralId:number
}

export default function CardCard({ card,peripheralId }: CardCardProps) {
    const {t} = useTranslation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const {mutationDelete} = useCardMutation();
    const mutation = mutationDelete(peripheralId, card.id);
    return (
            <Card>
                <Card.Header>
                    <Text size="lg">
                        {card.name}
                    </Text>
                    <img
                        src={DeleteIcon}
                        alt={t("cardCard.delete")}
                        className={styles.deleteIcon}
                        onClick={() => setConfirmDelete(true)}
                    />
                </Card.Header>
                <Card.Footer>
                    <Text muted>  {t("cardCard.lastUsed")}:<br/><span>{formatDate(card.last_used)}</span></Text>
                    <ConfirmDelete
                        show={confirmDelete}
                        name={t("cardCard.confirmDelete")}
                        onCancel={() => setConfirmDelete(false)}
                        onConfirm={() => {
                            mutation.mutate();
                            setConfirmDelete(false);
                        }}
                    />
                </Card.Footer>
            </Card>
    );
}
