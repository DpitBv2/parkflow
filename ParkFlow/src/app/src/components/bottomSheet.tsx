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
    children?: any;
};
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    state: "closed" | "mid" | "open";
};

const { height: WindowHeight } = Dimensions.get("window");
const MaxTranslateY = -WindowHeight + 200;
const MidTranslateY = -WindowHeight / 4;

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
    ({ children }, ref) => {
        const translateY = useSharedValue(0);

        const state = useSharedValue<"closed" | "mid" | "open">("closed");

        const scrollTo = useCallback((destination: number) => {
            "worklet";
            translateY.value = withSpring(destination, { damping: 10 });

            if (destination === 0) state.value = "closed";
            else if (destination === MidTranslateY) state.value = "mid";
            else state.value = "open";

            // console.log(state.value);
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                scrollTo,
                state: state.value,
            }),
            [scrollTo, state.value]
        );

        const context = useSharedValue({ y: 0 });
        const gesture = Gesture.Pan()
            .onStart(() => {
                context.value = { y: translateY.value };
            })
            .onUpdate((event: any) => {
                translateY.value = event.translationY + context.value.y;
                translateY.value = Math.max(translateY.value, MaxTranslateY);
            })
            .onEnd(() => {
                if (translateY.value > -WindowHeight / 10) scrollTo(0);
                else if (translateY.value > -WindowHeight / 2)
                    scrollTo(MidTranslateY);
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
                    <Background borderRadius={25} opacity={0.3} padding={500}>
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
        backgroundColor: theme().colors.background,
        borderRadius: 50,
        alignSelf: "center",
        marginVertical: 10,
    },
});
