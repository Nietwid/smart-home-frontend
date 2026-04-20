import { useState } from "react";
import { Card, Divider, Text, Toggle, Stack, Tag, TagGroup } from "rsuite";
import { useTranslation } from "react-i18next";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";
import { IRule } from "../../../interfaces/IRule.ts";
import DeleteIcon from "/static/svg/delete.svg";
import styles from "./RuleCard.module.css";
import useRuleMutation from "../../../hooks/queries/useRuleMutation.tsx";

const renderExtraSettings = (settings: object) => {
    const entries = Object.entries(settings);
    if (entries.length === 0) return null;

    return (
        <TagGroup className={styles.tagGroup}>
            {entries.map(([key, value]) => (
                <Tag key={key} size="sm" color="blue">
                    {key}: <b>{String(value)}</b>
                </Tag>
            ))}
        </TagGroup>
    );
};

export default function RuleCard({id, name, enabled, triggers, actions, is_local }: IRule) {
    const { t } = useTranslation();
    const {updateRule, deleteRule} = useRuleMutation();
    const updateMutation = updateRule(id);
    const deleteMutation = deleteRule(id);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isEnabled, setIsEnabled] = useState(enabled);

    async function handleToggle (checked: boolean) {
        await updateMutation.mutateAsync({ enabled: checked });
        console.log(updateMutation.isError)
        setIsEnabled(checked);
    }

    async function handleDelete() {
        setConfirmDelete(false);
        deleteMutation.mutate();
    }

    return (
        <Card className={`${styles.container} ${!isEnabled ? styles.disabled : ''}`} shaded>
            <Card.Header className={styles.header}>
                <Stack justifyContent="space-between" alignItems="center">
                    <Stack spacing={10}>
                        <Text weight="bold" size="lg" className={styles.title}>
                            {name || t("ruleCard.unnamedRule")}
                        </Text>
                        {is_local && <Tag color="cyan" size="sm">{t("ruleCard.local")}</Tag>}
                    </Stack>

                    <Stack spacing={15}>
                        {! is_local && (
                            <Toggle
                                checked={isEnabled}
                                onChange={handleToggle}
                                size="md"
                            />
                        )}
                        <img
                            src={DeleteIcon}
                            alt="Delete"
                            className={styles.deleteIcon}
                            onClick={() => setConfirmDelete(true)}
                        />
                    </Stack>
                </Stack>
            </Card.Header>

            <Card.Body className={styles.body}>
                <div className={styles.section}>
                    <Text muted size="sm" className={styles.sectionLabel}>{t("ruleCard.when").toUpperCase()}</Text>
                    {triggers.map(tg => (
                        <div key={tg.id} className={styles.logicRow}>
                            <div className={styles.logicContent}>
                                <Text>
                                    <span className={styles.highlight}>{tg.peripheral_name}</span>
                                    <small> ({tg.device_name})</small>
                                    {" "}{t("ruleCard.trigger")}{" "}
                                    <span className={styles.eventLabel}>{tg.event}</span>
                                </Text>
                                {renderExtraSettings(tg.extra_settings)}
                            </div>
                        </div>
                    ))}
                </div>

                <Divider className={styles.divider}>
                    <Text muted size="xs">THEN</Text>
                </Divider>

                <div className={styles.section}>
                    <Text muted size="sm" className={styles.sectionLabel}>{t("ruleCard.then").toUpperCase()}</Text>
                    {actions.map(action => (
                        <div key={action.id} className={styles.logicRow}>
                            <div className={styles.logicContent}>
                                <Text>
                                    <span className={styles.highlight}>{action.peripheral_name}</span>
                                    <small> ({action.device_name})</small>
                                    : <b>{action.action}</b>
                                </Text>
                                {renderExtraSettings(action.extra_settings)}
                            </div>
                        </div>
                    ))}
                </div>
            </Card.Body>

            <ConfirmDelete
                show={confirmDelete}
                name={name || ""}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
            />
        </Card>
    );
}