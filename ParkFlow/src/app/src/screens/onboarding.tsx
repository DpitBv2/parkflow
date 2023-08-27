import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef, useState } from "react";
import { Animated, FlatList, View } from "react-native";

import Background from "../components/background";
import NextButton from "../components/nextButton";
import OnboardingItem from "../components/onboardingItem";
import Paginator from "../components/paginator";
import slides from "../util/slides";

const Onboarding = ({ navigation }: { navigation: any }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1) {
            (slidesRef.current as any).scrollToIndex({
                index: currentIndex + 1,
            });
        } else {
            try {
                AsyncStorage.setItem("onboarding", "true");
                navigation.navigate("Login");
            } catch {
                console.log("Error saving onboarding");
            }
        }
    };

    return (
        <Background>
            <View style={{ flex: 0.5 }}></View>
            <View style={{ flex: 4 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item: any) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <Paginator
                data={slides}
                scrollX={scrollX}
                style={{ marginTop: 20 }}
            />

            <NextButton
                scrollTo={scrollTo}
                percentage={(currentIndex + 1) * (100 / slides.length)}
                style={{ marginBottom: 20 }}
            />
        </Background>
    );
};

export default Onboarding;
