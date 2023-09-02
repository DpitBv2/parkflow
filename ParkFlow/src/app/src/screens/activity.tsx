import * as Location from "expo-location";
import { useEffect } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import ActivityItem from "../components/activityItem";
import Background from "../components/background";
import MenuButton from "../components/menuButton";
import Text from "../components/text";
import { theme } from "../util/theme";

const data = new Array(25).fill(0).map((_, index) => ({
    id: index,
    street: "Bulevardul Alexandru Vlahuta 63",
    country: "Romania",
    city: "Brasov",
    startDate: new Date(),
    endDate: new Date("2023-09-03"),
    price: 19.99,
    longitude: 25.630817357450724,
    latitude: 45.643762029499506,
    payment: "7791",
    status: "inactive",
}));

const Activity = ({ navigation }: { navigation: any }) => {
    const viewableItems = useSharedValue<ViewToken[]>([]);

    const days = 14;
    const time = 200;
    const money = 100;

    useEffect(() => {
        (async () => {
            let adress = await Location.reverseGeocodeAsync({
                latitude: 45.643762029499506,
                longitude: 25.630817357450724,
            });
            console.log(adress);
        })();
    }, []);

    return (
        <Background>
            <View style={styles.topContainer}>
                <MenuButton navigation={navigation} />
                <Text bold fontSize={25} style={{ flex: 1 }} center>
                    Activity
                </Text>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.overView}>
                    <Text bold fontSize={20}>
                        Overview
                    </Text>

                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 5,
                            }}>
                            <Text fontSize={15}>You used ParkFlow</Text>
                            <Text fontSize={15} bold>
                                {" " + days + " "}
                            </Text>
                            <Text fontSize={15}>times.</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                            <View style={{ width: 25, alignItems: "center" }}>
                                <FAIcon
                                    name="hourglass-end"
                                    size={18}
                                    color={theme().colors.primary}
                                />
                            </View>
                            <Text fontSize={15} style={{ marginLeft: 10 }}>
                                Saved
                            </Text>
                            <Text fontSize={15} bold>
                                {" " + time + " minutes"}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 5,
                            }}>
                            <View style={{ width: 25, alignItems: "center" }}>
                                <FAIcon
                                    name="money-check-alt"
                                    size={18}
                                    color={theme().colors.primary}
                                />
                            </View>
                            <Text fontSize={15} style={{ marginLeft: 10 }}>
                                Spent
                            </Text>
                            <Text fontSize={15} bold>
                                {" LEI " + time}
                            </Text>
                        </View>
                    </View>
                </View>
                {data.length === 0 && (
                    <View style={{ marginTop: 150 }}>
                        <Text bold fontSize={18} center>
                            No actvity yet.{"\n"}Reserve a parking spot!
                        </Text>
                    </View>
                )}
                <FlatList
                    data={data}
                    contentContainerStyle={{ paddingVertical: 0 }}
                    onViewableItemsChanged={({ viewableItems: vItems }) => {
                        viewableItems.value = vItems;
                    }}
                    style={{ marginTop: 15 }}
                    renderItem={({ item }) => {
                        return (
                            <ActivityItem
                                item={item}
                                viewableItems={viewableItems}
                            />
                        );
                    }}
                />
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: "absolute",
        top: 50,
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 60,
        alignItems: "center",
    },
    listContainer: {
        // alignItems: "center",
        flex: 1,
        width: "100%",
    },
    overView: {
        marginTop: 110,
        width: "88%",
        backgroundColor: theme().colors.background,
        borderRadius: 20,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
});

export default Activity;
