import {Badge, Button, Modal} from "rsuite";
import {useTranslation} from "react-i18next";
import styles from "./CardManager.module.css";
import CardCard from "../../../Cards/CardCard/CardCard.tsx";
import useRfidCardQuery from "../../../../hooks/queries/useRfidCardQuery.tsx";
import PlusIcon from "@rsuite/icons/Plus";
import AddCardForm from "../AddCardForm/AddCardForm.tsx";
import {useState} from "react";
import {ICard} from "../../../../interfaces/IRfid.tsx";
interface IProps {
    id:number,
    pending:boolean,
    open:boolean,
    onClose:()=>void,
}


export default function CardManager({id,pending,onClose,open}: IProps) {
    const { t } = useTranslation();
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const {cards} = useRfidCardQuery(id)

    if (!cards) return null;
    return (
        <Modal
            open={open}
            className={styles.section}
            onClose={onClose}
        >
            <Modal.Header>
                <Modal.Title >
                    <div className={styles.sectionHeader}>
                        <div>
                            <div className={styles.sectionTitle}>
                                <h3>{t("rfidPage.registeredCards")}</h3>
                                <Badge content={cards.length} color="cyan" />
                            </div>
                            <p className={styles.sectionDesc}>
                                {t("rfidPage.allCardsDescription")}
                            </p>
                        </div>
                    </div>
                </Modal.Title>
                <Button
                    appearance="primary"
                    startIcon={<PlusIcon />}
                    onClick={() => setShowAddCardForm(true)}
                >
                </Button>
            </Modal.Header>
            <Modal.Body >
                {cards.length > 0 ? (
                    <div className={styles.cardsContainer}>
                        {cards.map((card:ICard) => (
                            <CardCard key={card.id} card={card} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}></span>
                        <h4 className={styles.emptyTitle}> {t("rfidPage.noCardsTitle")}</h4>
                        <p className={styles.emptyDesc}>
                            {t("rfidPage.noCardsDescription")}
                        </p>

                    </div>
                )}
                <AddCardForm
                    show={showAddCardForm}
                    pending={pending}
                    id={id}
                    handleAddFunction={() => setShowAddCardForm(false)}
                />
            </Modal.Body>
        </Modal>
    )
}



