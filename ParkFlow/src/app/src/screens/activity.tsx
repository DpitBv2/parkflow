import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import ActivityItem from "../components/activityItem";
import Background from "../components/background";
import MenuButton from "../components/menuButton";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ReservationContext } from "../context/reservationContext";
import { theme } from "../util/theme";
import Loading from "./loading";

const Activity = ({ navigation }: { navigation: any }) => {
    const viewableItems = useSharedValue<ViewToken[]>([]);

    const [reservations, setReservations] = useState<any[] | null>(null);
    const [page, setPage] = useState<number>(0);
    const [uses, setUses] = useState<number | null>(null);
    const [time, setTime] = useState<number | null>(null);
    const [money, setMoney] = useState<number | null>(null);

    const { getAll, getCount, getCost } = useContext(ReservationContext);
    const { userToken } = useContext(AuthContext);

    const viewableRef = useRef(viewableItems);

    useEffect(() => {
        const getActivity = async () => {
            await getAll(userToken, page)
                .then((response: any) => {
                    response = response.map((item: any) => {
                        item.startTime = new Date(item.startTime);
                        item.endTime = new Date(item.endTime);
                        return item;
                    });

                    if (reservations === null) setReservations(response);
                    else setReservations([...reservations, ...response]);

                    setTime(1);

                    getCount(userToken)
                        .then((response: any) => {
                            setUses(response);
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });

                    getCost(userToken)
                        .then((response: any) => {
                            setMoney(response);
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });
                })
                .catch((error: any) => {
                    console.log(error);
                });
        };

        getActivity();
    }, []);

    const loadMore = async () => {
        if (uses === null) return;

        const maxPage = Math.ceil(uses / 10);

        if (page >= maxPage) return;

        setPage(page + 1);

        await getAll(userToken, page)
            .then((response: any) => {
                response = response.map((item: any) => {
                    item.startTime = new Date(item.startTime);
                    item.endTime = new Date(item.endTime);
                    return item;
                });

                if (reservations === null) setReservations(response);
                else setReservations([...reservations, ...response]);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const onViewableItemsChanged = (viewableItems: any) => {
        viewableRef.current.value = viewableItems;
    };

    const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

    if (
        reservations === null ||
        (reservations !== null && uses === null) ||
        (reservations !== null && money === null)
    )
        return <Loading />;

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
                            <Text fontSize={15}>You used ParkFlow </Text>
                            <Text fontSize={15} bold>
                                {uses}
                            </Text>
                            <Text fontSize={15}> times.</Text>
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
                                {" " + time + " hours"}
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
                                {" LEI " + money?.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
                {reservations?.length === 0 && (
                    <View style={{ marginTop: 150 }}>
                        <Text bold fontSize={18} center>
                            No actvity yet.{"\n"}Reserve a parking spot!
                        </Text>
                    </View>
                )}
                <FlatList
                    data={reservations}
                    contentContainerStyle={{ paddingVertical: 0 }}
                    onViewableItemsChanged={({ viewableItems: vItems }) => {
                        viewableRef.current.value = vItems;
                    }}
                    //@ts-ignore
                    // viewabilityConfigCallbackPairs={
                    //     viewabilityConfigCallbackPairs.current
                    // }
                    style={{ marginTop: 15 }}
                    onEndReached={loadMore}
                    // keyExtractor={(_, index) => `list_item${index}`}
                    renderItem={({ item }) => {
                        return (
                            <ActivityItem
                                item={item}
                                viewableItems={viewableRef.current}
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
        backgroundColor: theme().colors.white,
        borderRadius: 20,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
});

export default Activity;
