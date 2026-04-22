import {Button, NumberInput, Slider, Toggle} from "rsuite";
import {SyntheticEvent, useState} from "react";
import useTriggerActionEventMutation from "../../../hooks/useTriggerActionEventMutation.ts";
import {peripheralAction} from "../../../utils/commandBuilders.ts";
import BaseWidget from "../BaseWidget/BaseWidget.tsx";
import {MessageAction} from "../../../enums/message_command.ts";
import marks from "./marks.ts";
import {ISequentialLightWidget} from "../../../interfaces/Widgets/ISequentialLight.ts";
import styles from "./SequentialLightWidget.module.css";
import {useTranslation} from "react-i18next";

export default function SequentialLightWidget({id, state, config, pending}:ISequentialLightWidget){
    const [brightness, setBrightness] = useState(state.brightness);
    const [speed, setSpeed] = useState(state.speed)
    const [lightingTime, setLightingTime] = useState(state.lighting_time)
    const mutation = useTriggerActionEventMutation()
    const isLoading = mutation.isPending ||
        pending.includes(MessageAction.TOGGLE) ||
        pending.includes(MessageAction.BLINK) ||
        pending.includes(MessageAction.UPDATE_STATE)

    const {t} = useTranslation();
    function handleTime(value: string | number | null, _: SyntheticEvent<Element, Event>){
        if (value === null) return;
        if (typeof value === "string") setLightingTime(parseInt(value));
    }
    async function handleToggle() {
        const data = peripheralAction(id, MessageAction.TOGGLE, {});
        await mutation.mutateAsync(data)
    }

    async function handleBlink() {
        const data = peripheralAction(id, MessageAction.BLINK, {});
        await mutation.mutateAsync(data)
    }

    async function handleSave(){
        const data = peripheralAction(id, MessageAction.UPDATE_STATE, {
            brightness: brightness,
            speed:speed,
            lighting_time: lightingTime
        });
        await mutation.mutateAsync(data)
    }
    return (
        <BaseWidget name={config?.name} className={styles.container} w={3} h={3}>
            <Toggle loading={isLoading} onChange={handleToggle} checked={state.is_on} className={styles.toggle}/>
            <Button loading={isLoading} onClick={handleBlink} disabled={state.is_on} className={styles.blink}>{t("sequentialLight.blinkButton")}</Button>
            <div className={styles.container}>
                <span>{t("sequentialLight.lightningTime")}</span>
                <NumberInput value={lightingTime} onChange={handleTime} disabled={isLoading}/>
                <span>{t("sequentialLight.brightness")}</span>
                <Slider
                    className={styles.slider}
                    graduated
                    progress
                    max={100}
                    marks={marks}
                    renderTooltip={value => `${value}%`}
                    onChange={(value)=> setBrightness(value)}
                    disabled={isLoading}
                    value={brightness}
                />
                <span>{t("sequentialLight.speed")}</span>
                <Slider
                    className={styles.slider}
                    graduated
                    progress
                    max={100}
                    marks={marks}
                    renderTooltip={value => `${value}%`}
                    onChange={(value)=> setSpeed(value)}
                    disabled={isLoading}
                    value={speed}
                />
                <Button
                    width={250}
                    loading={isLoading}
                    onClick={handleSave}
                    className={styles.saveButton}
                >
                    {t("buttons.saveButton")}
                </Button>
            </div>
        </BaseWidget>
    );
}