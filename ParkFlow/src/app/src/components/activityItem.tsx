import { useState } from "react";
import { StyleSheet, View, ViewToken } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ActiveOpacity, MapDeltaInitial, Weekdays } from "../util/constants";
import { theme } from "../util/theme";
import { Logo } from "./logo";
import Modal from "./modal";
import Text from "./text";

const formatDuration = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;

    return `${hours}h ${minutes}m`;
};

const ActivityItem = ({
    viewableItems,
    item,
}: {
    viewableItems: Animated.SharedValue<ViewToken[]>;
    item: any;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const rStyle = useAnimatedStyle(() => {
        const visible = Boolean(
            viewableItems.value
                .filter((item) => item.isViewable)
                .find((viewableItem) => viewableItem.item.id === item.id)
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
                <Marker
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }}
                />
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
                <View style={styles.textContainer}>
                    <Text fontSize={15} overflow>
                        {item.street}
                    </Text>
                    <Text fontSize={12}>
                        {item.startDate.getDate() +
                            " " +
                            item.startDate.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            String(item.startDate.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.startDate.getMinutes()).padStart(
                                2,
                                "0"
                            ) +
                            " - " +
                            (item.startDate.getDate() !== item.endDate.getDate()
                                ? item.endDate.getDate() +
                                  " " +
                                  item.endDate.toLocaleString("default", {
                                      month: "short",
                                  }) +
                                  ", "
                                : "") +
                            String(item.endDate.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.endDate.getMinutes()).padStart(2, "0")}
                    </Text>
                </View>
                <Text bold fontSize={18}>
                    LEI {item.price}
                </Text>
            </TouchableOpacity>
            <Modal
                visible={isVisible}
                setVisible={setIsVisible}
                onClose={() => setIsVisible(false)}
                width={"90%"}>
                <View>
                    <Text bold fontSize={18}>
                        ParkFlow Spot
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                        {Weekdays[item.startDate.getDay()] +
                            ", " +
                            item.startDate.getDate() +
                            " " +
                            item.startDate.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            item.startDate.getFullYear() +
                            " - " +
                            item.city +
                            ", " +
                            item.country}
                    </Text>
                    <Text overflow>{item.street}</Text>
                    <MapView
                        showsUserLocation={false}
                        followsUserLocation={false}
                        showsMyLocationButton={false}
                        rotateEnabled={false}
                        moveOnMarkerPress={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        mapType="standard"
                        initialRegion={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                            latitudeDelta: MapDeltaInitial / 2,
                            longitudeDelta: MapDeltaInitial / 2,
                        }}
                        style={styles.map}>
                        {marker()}
                    </MapView>
                    <Text fontSize={16}>
                        {item.startDate.getDate() +
                            " " +
                            item.startDate.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            String(item.startDate.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.startDate.getMinutes()).padStart(
                                2,
                                "0"
                            ) +
                            " - " +
                            item.endDate.getDate() +
                            " " +
                            item.endDate.toLocaleString("default", {
                                month: "short",
                            }) +
                            ", " +
                            String(item.endDate.getHours()).padStart(2, "0") +
                            ":" +
                            String(item.endDate.getMinutes()).padStart(2, "0")}
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
                        <View style={{ flexDirection: "row", marginLeft: 5 }}>
                            <Text fontSize={16}>Duration: </Text>
                            <Text fontSize={16} bold>
                                {formatDuration(
                                    item.endDate.getTime() -
                                        item.startDate.getTime()
                                )}
                            </Text>
                        </View>
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
                                {item.payment}
                            </Text>

                            <View
                                style={{
                                    marginLeft: "auto",
                                }}>
                                <Text bold fontSize={18}>
                                    LEI {item.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "88%",
        backgroundColor: theme().colors.background,
        borderRadius: 20,
        alignSelf: "center",
        marginBottom: 15,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
    },
    textContainer: {
        width: "56%",
        justifyContent: "center",
        marginRight: 10,
        marginLeft: -5,
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

export default ActivityItem;
