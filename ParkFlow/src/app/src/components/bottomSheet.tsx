import React, { useCallback, useImperativeHandle } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { theme } from "../util/theme";
import Background from "./background";

export type BottomSheetProps = {
    children: any;
    midTranslateY?: number;
};
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    state: "closed" | "mid" | "open";
    translateY: number;
};

const { height: WindowHeight } = Dimensions.get("window");
const MaxTranslateY = -WindowHeight + 200;
const MinTranslateY = 50;

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
    ({ children, midTranslateY = -150 }, ref) => {
        const translateY = useSharedValue(10);

        const state = useSharedValue<"closed" | "mid" | "open">("closed");

        const scrollTo = useCallback((destination: number) => {
            "worklet";
            translateY.value = withSpring(destination, { damping: 10 });

            if (destination === MinTranslateY) state.value = "closed";
            else if (destination === midTranslateY) state.value = "mid";
            else state.value = "open";
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                scrollTo,
                state: state.value,
                translateY: translateY.value,
            }),
            [scrollTo, state.value]
        );

        const context = useSharedValue({ y: 0 });
        const gesture = Gesture.Pan()
            .onStart(() => {
                context.value = { y: translateY.value };
            })
            .onUpdate((event: any) => {
                if (state.value === "closed") return;
                translateY.value = event.translationY + context.value.y;
                translateY.value = Math.max(translateY.value, MaxTranslateY);
            })
            .onEnd(() => {
                // if (translateY.value > -WindowHeight / 10)
                //     scrollTo(MinTranslateY);
                if (translateY.value > -WindowHeight / 2)
                    scrollTo(midTranslateY);
                else scrollTo(MaxTranslateY);
            });

        const rBottomSheetStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateY: translateY.value }],
            };
        });

        return (
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.container, rBottomSheetStyle]}>
                    <Background borderRadius={25} opacity={0.2} flip>
                        <View style={styles.line} />
                        {children}
                    </Background>
                </Animated.View>
            </GestureDetector>
        );
    }
);

export default BottomSheet;

const styles = StyleSheet.create({
    container: {
        height: WindowHeight,
        width: "100%",
        backgroundColor: theme().colors.background,
        position: "absolute",
        top: WindowHeight,
        borderRadius: 25,
    },
    line: {
        height: 6,
        width: 80,
        backgroundColor: theme().colors.white,
        borderRadius: 50,
        alignSelf: "center",
        marginVertical: 10,
    },
});
