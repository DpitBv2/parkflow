import { useState } from "react";
import { StyleSheet, ViewToken } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import { Logo } from "./logo";

const HubItem = ({
    viewableItems,
    item,
}: {
    viewableItems: Animated.SharedValue<ViewToken[]>;
    item: any;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const rStyle = useAnimatedStyle(() => {
        const visible = Boolean(
            true
            // viewableItems.value
            //     .filter((item) => item.isViewable)
            //     .find((viewableItem) => viewableItem.item.id === item.id)
        );

        return {
            opacity: withTiming(visible ? 1 : 0, { duration: 150 }),
            transform: [
                {
                    scale: withTiming(visible ? 1 : 0.6, { duration: 150 }),
                },
            ],
        };
    }, []);

    const marker = () => {
        return (
            <>
                {/* <Marker
                    coordinate={{
                        latitude: item.sensor.latitude,
                        longitude: item.sensor.longitude,
                    }}>
                    <Image
                        source={require("../../assets/images/pin.png")}
                        style={{
                            height: 50,
                            width: 47,
                        }}
                    />
                </Marker> */}
            </>
        );
    };

    return (
        <Animated.View style={rStyle}>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={ActiveOpacity}
                onPress={() => {
                    setIsVisible(true);
                }}>
                <Logo style={{ marginLeft: -10, height: 40 }} />
                {/* <View style={styles.textContainer}>
                    <Text fontSize={15} overflow>
                        {item.sensor.address.street}
                    </Text>
                    <Text fontSize={12} overflow>
                        {item.startTime.getDate() +
                            " " +
                            item.startTime.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            String(item.startTime.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.startTime.getMinutes()).padStart(
                                2,
                                "0"
                            ) +
                            " - " +
                            (item.startTime.getDate() !== item.endTime.getDate()
                                ? item.endTime.getDate() +
                                  " " +
                                  item.endTime.toLocaleString("default", {
                                      month: "short",
                                  }) +
                                  ", "
                                : "") +
                            String(item.endTime.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.endTime.getMinutes()).padStart(2, "0")}
                    </Text>
                </View>
                <Text bold fontSize={18} style={{ marginLeft: "auto" }}>
                    LEI {item.cost.toFixed(2)}
                </Text> */}
            </TouchableOpacity>
            {/* <Modal
                visible={isVisible}
                setVisible={setIsVisible}
                onClose={() => setIsVisible(false)}
                width={"90%"}>
                <View>
                    <Text bold fontSize={18}>
                        ParkFlow Spot
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                        {Weekdays[item.startTime.getDay()] +
                            ", " +
                            item.startTime.getDate() +
                            " " +
                            item.startTime.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            item.startTime.getFullYear() +
                            " - " +
                            item.sensor.address.city +
                            ", " +
                            item.sensor.address.country}
                    </Text>
                    <Text overflow>{item.sensor.address.street}</Text>
                    <MapView
                        // showsUserLocation={false}
                        // followsUserLocation={false}
                        // showsMyLocationButton={false}
                        // rotateEnabled={false}
                        // moveOnMarkerPress={false}
                        // pitchEnabled={false}
                        // scrollEnabled={false}
                        // zoomEnabled={false}
                        // mapType="standard"
                        initialRegion={{
                            latitude: item.sensor.latitude,
                            longitude: item.sensor.longitude,
                            latitudeDelta: MapDeltaInitial / 4,
                            longitudeDelta: MapDeltaInitial / 4,
                        }}
                        style={styles.map}>
                        {marker()}
                    </MapView>
                    <Text fontSize={16}>
                        {item.startTime.getDate() +
                            " " +
                            item.startTime.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            String(item.startTime.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.startTime.getMinutes()).padStart(
                                2,
                                "0"
                            ) +
                            " - " +
                            item.endTime.getDate() +
                            " " +
                            item.endTime.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            String(item.endTime.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.endTime.getMinutes()).padStart(2, "0")}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 5,
                        }}>
                        <MIcon
                            name="clock"
                            size={20}
                            color={theme().colors.primary}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text fontSize={18}>Payment</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 5,
                                alignItems: "center",
                            }}>
                            <FAIcon
                                name="money-check-alt"
                                size={20}
                                color={theme().colors.primary}
                            />

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginLeft: 10,
                                }}>
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                            </View>

                            <Text fontSize={16} bold style={{ marginLeft: 5 }}>
                                {item.paymentMethod}
                            </Text>

                            <View
                                style={{
                                    marginLeft: "auto",
                                }}>
                                <Text bold fontSize={18}>
                                    LEI {item.cost.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal> */}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "88%",
        backgroundColor: theme().colors.white,
        borderRadius: 20,
        alignSelf: "center",
        marginBottom: 15,
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 20,
        paddingVertical: 5,
        alignItems: "center",
    },
    textContainer: {
        width: "56%",
        justifyContent: "center",
        marginRight: 5,
        marginLeft: -2,
        flex: 1,
    },
    map: {
        height: 120,
        width: "100%",
        marginVertical: 15,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: theme().colors.dark,
        marginLeft: 2,
    },
});

export default HubItem;
