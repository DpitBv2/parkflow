import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import SVG, { Circle, G } from "react-native-svg";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";

const NextButton = ({
    percentage,
    scrollTo,
    style,
}: {
    percentage: number;
    scrollTo: any;
    style?: any;
}) => {
    const size = 100;
    const strokeWidth = 3.5;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue: number) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset =
                circumference - (circumference * value.value) / 100;

            if (progressRef?.current) {
                (progressRef.current as any).setNativeProps({
                    strokeDashoffset,
                });
            }
        });

        return () => {
            progressAnimation.removeAllListeners();
        };
    }, [percentage]);

    return (
        <View style={{ ...styles.container, ...style }}>
            <TouchableOpacity
                onPress={scrollTo}
                activeOpacity={ActiveOpacity}
                style={{ justifyContent: "center", alignItems: "center" }}>
                <SVG width={size} height={size}>
                    <G rotation="-90" origin={center}>
                        <Circle
                            stroke={theme().colors.lightGrey}
                            cx={center}
                            cy={center}
                            r={radius}
                            strokeWidth={strokeWidth}
                            fill="transparent"
                        />
                        <Circle
                            ref={progressRef}
                            stroke={theme().colors.primary}
                            cx={center}
                            cy={center}
                            r={radius}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            fill="transparent"
                        />
                    </G>
                </SVG>

                <View style={styles.button}>
                    <IconButton
                        icon="arrow-right"
                        iconColor={theme().colors.white}
                        size={30}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        position: "absolute",
        backgroundColor: theme().colors.primary,
        borderRadius: 100,
        padding: 5,
    },
});

export default NextButton;
