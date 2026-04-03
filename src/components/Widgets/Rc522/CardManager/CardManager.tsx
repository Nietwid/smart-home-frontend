import {useState, useMemo} from "react";
import {Badge, Button, Input, InputGroup, Modal} from "rsuite";
import {useTranslation} from "react-i18next";
import styles from "./CardManager.module.css";
import CardCard from "../../../Cards/CardCard/CardCard.tsx";
import useRfidCardQuery from "../../../../hooks/queries/useRfidCardQuery.tsx";
import AddCardForm from "../AddCardForm/AddCardForm.tsx";
import {ICard} from "../../../../interfaces/IRfid.tsx";
import LoadingAnimation from "../../../ui/LoadingAnimation/LoadingAnimation.tsx";
import SearchIcon from '@rsuite/icons/Search';
interface IProps {
    id:number,
    pending:boolean,
    open:boolean,
    onClose:()=>void,
}

export default function CardManager({id,pending,onClose,open}: IProps) {
    const { t } = useTranslation();
    const [filter, setFilter] = useState("");
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const {cards} = useRfidCardQuery(id)

    const filteredCards = useMemo(() => {
        if (!cards) return [];
        return cards.filter((card: ICard) =>
            card.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [cards, filter]);

    if (!cards) return <LoadingAnimation size={"small"}/>;
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
                                <h3>{t("cardManager.registeredCards")}</h3>
                                <Badge content={cards.length} color="cyan" />
                            </div>
                            <p className={styles.sectionDesc}>
                                {t("cardManager.allCardsDescription")}
                            </p>
                        </div>
                    </div>
                    <div className={styles.toolbar}>
                        <InputGroup inside className={styles.searchInput}>
                            <Input
                                placeholder={t("cardManager.searchPlaceholder")}
                                value={filter}
                                onChange={setFilter}
                            />
                            <InputGroup.Addon>
                                <SearchIcon />
                            </InputGroup.Addon>
                        </InputGroup>

                        <Button
                            appearance="primary"
                            onClick={() => setShowAddCardForm(true)}
                        >
                            {t("cardManager.addCardButton")}
                        </Button>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {cards.length > 0 ? (
                    <div className={styles.cardsContainer}>
                        {filteredCards.map((card:ICard) => (
                            <CardCard key={card.id} card={card} peripheralId={id} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}></span>
                        <h4 className={styles.emptyTitle}> {t("cardManager.noCardsTitle")}</h4>
                        <p className={styles.emptyDesc}>
                            {t("cardManager.noCardsDescription")}
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



