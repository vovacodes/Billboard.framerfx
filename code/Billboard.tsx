import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { motion, AnimatePresence } from "framer-motion"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

addPropertyControls(Billboard, {
    url: {
        type: ControlType.Image,
        title: "Image",
    },
    backgroundSize: {
        type: ControlType.Enum,
        title: "Size",
        defaultValue: "cover",
        options: ["cover", "contain", "100% 100%"],
        optionTitles: ["Fill", "Fit", "Stretch"],
    },
    background: {
        title: "Background",
        type: ControlType.Color,
        defaultValue: "none",
    },
    effect: {
        title: "Effect",
        type: ControlType.Enum,
        defaultValue: "crossfade",
        options: ["crossfade", "conveyor", "pile"],
        optionTitles: ["Crossfade", "Conveyor", "Pile"],
    },
    // Transition props
    transitionType: {
        title: "Transition",
        type: ControlType.SegmentedEnum,
        defaultValue: "spring",
        options: ["spring", "tween"],
        optionTitles: ["Spring", "Tween"],
    },
    // spring
    damping: {
        title: "Damping",
        type: ControlType.Number,
        defaultValue: 15,
        min: 0,
        step: 10,
        displayStepper: true,
        hidden(props) {
            return props.transitionType !== "spring"
        },
    },
    stiffness: {
        title: "Stiffness",
        type: ControlType.Number,
        defaultValue: 100,
        min: 0,
        step: 10,
        displayStepper: true,
        hidden(props) {
            return props.transitionType !== "spring"
        },
    },
    // tween
    duration: {
        title: "Duration",
        type: ControlType.Number,
        defaultValue: 1,
        min: 0,
        step: 0.1,
        unit: "s",
        displayStepper: true,
        hidden(props) {
            return props.transitionType !== "tween"
        },
    },
    easing: {
        title: "Easing",
        type: ControlType.Enum,
        defaultValue: "easeOut",
        options: [
            "linear",
            "easeIn",
            "easeOut",
            "easeInOut",
            "circIn",
            "circOut",
            "circInOut",
            "backIn",
            "backOut",
            "backInOut",
            "anticipate",
        ],
        optionTitles: [
            "linear",
            "easeIn",
            "easeOut",
            "easeInOut",
            "circIn",
            "circOut",
            "circInOut",
            "backIn",
            "backOut",
            "backInOut",
            "anticipate",
        ],
        hidden(props) {
            return props.transitionType !== "tween"
        },
    },
})

const animations = {
    crossfade: {
        initial: { opacity: 0 },
        active: { opacity: 1 },
        exit: { opacity: 0 },
    },
    conveyor: {
        initial: { x: "100%" },
        active: { x: 0 },
        exit: { x: "-100%" },
    },
    pile: {
        initial: { x: "100%" },
        active: { x: 0 },
        exit: { x: 0 },
    },
}

export function Billboard({
    width,
    height,
    url,
    background,
    backgroundSize,
    effect,
    transitionType,
    damping,
    stiffness,
    duration,
    easing,
}) {
    if (!url) {
        return <EmptyStatePlaceholder width={width} height={height} />
    }

    const animation = animations[effect]
    const transition =
        transitionType === "spring"
            ? { type: "spring", damping, stiffness }
            : { type: "tween", duration, ease: easing }

    return (
        <Frame size="100%" overflow="hidden" background={background}>
            <AnimatePresence initial={false}>
                <motion.div
                    key={url}
                    initial={animation.initial}
                    animate={animation.active}
                    exit={animation.exit}
                    transition={transition}
                    style={{
                        position: "absolute",
                        width,
                        height,
                        backgroundImage: `url(${url})`,
                        backgroundSize,
                        backgroundRepeat: "no-repeat",
                    }}
                />
            </AnimatePresence>
        </Frame>
    )
}

function EmptyStatePlaceholder({
    width,
    height,
}: {
    width: number
    height: number
}) {
    return (
        <div
            style={{
                alignItems: "center",
                backgroundColor: "rgba(136, 97, 238, 0.4)",
                border: "1px dashed rgba(136, 97, 238, 0.6)",
                color: "#8861EE",
                display: "flex",
                fontSize: 16,
                flexWrap: "nowrap",
                height,
                padding: "10px",
                width,
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    textAlign: "center",
                    textOverflow: "clip",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
            >
                Choose an image in the property controls panel 👉
            </div>
        </div>
    )
}
