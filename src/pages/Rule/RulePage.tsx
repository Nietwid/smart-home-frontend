import {useTranslation} from "react-i18next";
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../components/ui/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import {MessageAction} from "../../enums/message_command.ts";
import {useState} from "react";
import SyncType from "../../constant/syncType.ts";
import {cpuAction} from "../../utils/commandBuilders.ts";
import {useParams} from "react-router-dom";
import useTriggerActionEventMutation from "../../hooks/useTriggerActionEventMutation.ts";
import useDeviceQuery from "../../hooks/queries/device/useDeviceQuery.tsx";
import RuleForm from "../../components/RuleForm/RuleForm.tsx";
import useDeviceRuleQuery from "../../hooks/queries/useDeviceRuleQuery.ts";
import {IRule} from "../../interfaces/IRule.ts";
import RuleCard from "../../components/Cards/RuleCard/RuleCard.tsx";
import { Button, Stack, Grid, Row, Col, Text} from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import styles from "./RulePage.module.css";

export default function RulePage() {
    const params = useParams();
    const deviceId = parseInt(params.id ?? "0");
    const mutation = useTriggerActionEventMutation()
    const { device } = useDeviceQuery(deviceId);
    const { rules } = useDeviceRuleQuery(deviceId);
    const [openForm, setOpenForm] = useState(false);
    const {t} = useTranslation();
    async function startSync() {
        if (!device) return;
        const data = cpuAction(device.mac, MessageAction.SYNC_START, {sync_type:SyncType.RULE});
        await mutation.mutateAsync(data)
    }
    if (!device || !rules) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;
    return (
        <PageContainer>
            <PageHeader
                title={t("rulePage.title")}
                subtitle={t("rulePage.subtitle")}
            >
                <Stack spacing={12} justifyContent="flex-end">
                    {device.required_action.includes(MessageAction.UPDATE_RULE) && (
                        <Button
                            appearance="ghost"
                            color="blue"
                            onClick={() => startSync()}
                        >
                            {t("rulePage.updateRule")}
                        </Button>
                    )}

                    <Button
                        appearance="primary"
                        color="cyan"
                        startIcon={<PlusIcon />}
                        onClick={() => setOpenForm(true)}
                    >
                        {t("rulePage.addEvent")}
                    </Button>
                </Stack>
            </PageHeader>


            <main className={styles.pageContent}>
                {rules.length > 0 ? (
                    <Grid fluid>
                        <Row gutter={24}>
                            {rules.map((rule: IRule) => (
                                <Col
                                    key={`rule${rule.id}`}
                                    span={{ xs: 24, md: 12, lg: 8 }}
                                    className={styles.cardColumn}
                                >
                                    <RuleCard {...rule} />
                                </Col>
                            ))}
                        </Row>
                    </Grid>
                ) : (
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={styles.emptyState}
                    >
                        <Text muted size="lg">{t("rulePage.noRules")}</Text>
                        <Text muted size="sm">{t("rulePage.addFirst")}</Text>
                    </Stack>
                )}
            </main>

            <RuleForm open={openForm} onClose={() => setOpenForm(false)} />
        </PageContainer>
    );
}
