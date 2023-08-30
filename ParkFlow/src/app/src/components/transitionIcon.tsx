import { useEffect, useState } from "react";
import { Animated, View } from "react-native";

const TransitionIcon = ({
    firstIcon,
    secondIcon,
    toggle,
}: {
    firstIcon: any;
    secondIcon: any;
    toggle: boolean;
}) => {
    const [isFirstIconVisible, setIsFirstIconVisible] = useState(true);
    const fadeAnim = useState(new Animated.Value(1))[0];

    useEffect(() => {
        toggleIcons();
    }, [toggle]);

    const toggleIcons = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0, // Fading out (opacity 0)
                duration: 500, // Duration of the fade-out animation in milliseconds
                useNativeDriver: false, // You can't use native driver for opacity animations
            }),
            Animated.timing(fadeAnim, {
                toValue: 1, // Fading in (opacity 1)
                duration: 500, // Duration of the fade-in animation in milliseconds
                useNativeDriver: false,
            }),
        ]).start(() => {
            setIsFirstIconVisible(!isFirstIconVisible);
        });
    };

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Animated.View style={{ opacity: fadeAnim }}>
                {isFirstIconVisible ? firstIcon : secondIcon}
            </Animated.View>
        </View>
    );
};

export default TransitionIcon;
