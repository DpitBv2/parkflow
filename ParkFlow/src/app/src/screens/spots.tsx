import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import Background from "../components/background";
import HubItem from "../components/hubItem";
import MenuButton from "../components/menuButton";
import SpotItem from "../components/spotItem";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { PersonalContext } from "../context/personalContext";
import { theme } from "../util/theme";
import Loading from "./loading";

const Spots = ({ navigation }: { navigation: any }) => {
    const viewableItemsSpots = useSharedValue<ViewToken[]>([]);
    const viewableItemsHubs = useSharedValue<ViewToken[]>([]);

    const viewableRefSpots = useRef(viewableItemsSpots);
    const viewableRefHubs = useRef(viewableItemsHubs);

    const [spotSettings, setSpotSettings] = useState<Boolean>(true);

    const [setSpotPage, setSetSpotPage] = useState<number>(0);
    const [setSpotMaxPage, setSetSpotMaxPage] = useState<number>(0);
    const [hubPage, setHubPage] = useState<number>(0);
    const [hubMaxPage, setHubMaxPage] = useState<number>(0);

    const [spots, setSpots] = useState<any>(null);
    const [hubs, setHubs] = useState<any>(null);

    const { userToken } = useContext(AuthContext);
    const { getSensors, getSensorsCount, getHubs, getHubsCount } =
        useContext(PersonalContext);

    useEffect(() => {
        const getAll = async () => {
            await getSensors(userToken, setSpotPage)
                .then((response: any) => {
                    if (spots === null) setSpots(response);
                    else setSpots([...spots, ...response]);
                })
                .catch((error: any) => {
                    console.log(error);
                });

            await getHubs(userToken, hubPage)
                .then((response: any) => {
                    if (hubs === null) setHubs(response);
                    else setHubs([...hubs, ...response]);
                })
                .catch((error: any) => {
                    console.log(error);
                });

            await getSensorsCount(userToken)
                .then((response: any) => {
                    setSetSpotMaxPage(Math.ceil(response / 10));
                })
                .catch((error: any) => {
                    console.log(error);
                });

            await getHubsCount(userToken)
                .then((response: any) => {
                    setHubMaxPage(Math.ceil(response / 10));
                })
                .catch((error: any) => {
                    console.log(error);
                });
        };

        getAll();
    }, []);

    const loadMoreSpots = async () => {
        if (setSpotPage >= setSpotMaxPage) return;

        await getSensors(userToken, setSpotPage + 1)
            .then((response: any) => {
                setSetSpotPage(setSpotPage + 1);
                setSpots([...spots, ...response]);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const loadMoreHubs = async () => {
        if (hubPage >= hubMaxPage) return;

        await getHubs(userToken, hubPage + 1)
            .then((response: any) => {
                setHubPage(hubPage + 1);
                setHubs([...hubs, ...response]);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const onViewableItemsChangedSpots = (viewableItems: any) => {
        viewableRefSpots.current.value = viewableItems;
    };

    const viewabilityConfigCallbackPairsSpots = useRef([
        { onViewableItemsChangedSpots },
    ]);

    const onViewableItemsChangedHubs = (viewableItems: any) => {
        viewableRefHubs.current.value = viewableItems;
    };

    const viewabilityConfigCallbackPairsHubs = useRef([
        { onViewableItemsChangedHubs },
    ]);

    if (spots === null || hubs === null) return <Loading />;

    return (
        <Background>
            <View style={styles.topContainer}>
                <MenuButton navigation={navigation} />
                <Text bold fontSize={25} style={{ flex: 1 }} center>
                    My Spots
                </Text>
                <View style={{ position: "relative" }}>
                    <IconButton
                        icon="plus"
                        iconColor={theme().colors.primary}
                        containerColor={theme().colors.white}
                        size={30}
                        // onPress={}
                    />
                </View>
            </View>
            <View style={styles.button}>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: spotSettings
                                ? theme().colors.primary
                                : theme().colors.white,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            padding: 10,
                            width: "100%",
                        }}
                        onPress={() => setSpotSettings(true)}>
                        <Text
                            center
                            bold
                            color={
                                spotSettings
                                    ? theme().colors.light
                                    : theme().colors.dark
                            }>
                            Spots
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                    }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: spotSettings
                                ? theme().colors.white
                                : theme().colors.primary,
                            borderTopEndRadius: 20,
                            borderBottomEndRadius: 20,
                            padding: 10,
                            width: "100%",
                        }}
                        onPress={() => setSpotSettings(false)}>
                        <Text
                            bold
                            center
                            color={
                                spotSettings
                                    ? theme().colors.dark
                                    : theme().colors.light
                            }>
                            HUBs
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.list}>
                <View
                    style={{
                        position: "relative",
                        height: "100%",
                        width: "88%",
                    }}>
                    <FlatList
                        data={spots}
                        contentContainerStyle={{
                            paddingVertical: 0,
                            opacity: spotSettings ? 1 : 0,
                            position: "absolute",
                            top: 0,
                            flex: 1,
                        }}
                        style={{ marginTop: 15 }}
                        onEndReached={loadMoreSpots}
                        //@ts-ignore
                        viewabilityConfigCallbackPairs={
                            viewabilityConfigCallbackPairsSpots.current
                        }
                        keyExtractor={(_, index) => `list_item${index}`}
                        renderItem={({ item }) => {
                            return (
                                <SpotItem
                                    item={item}
                                    viewableItems={viewableRefSpots.current}
                                />
                            );
                        }}
                    />
                    <FlatList
                        data={hubs}
                        contentContainerStyle={{
                            paddingVertical: 0,
                            opacity: !spotSettings ? 1 : 0,
                            position: "absolute",
                            top: 100,
                        }}
                        style={{ marginTop: 15 }}
                        onEndReached={loadMoreHubs}
                        //@ts-ignore
                        viewabilityConfigCallbackPairs={
                            viewabilityConfigCallbackPairsHubs.current
                        }
                        keyExtractor={(_, index) => `list_item${index}`}
                        renderItem={({ item }) => {
                            return (
                                <HubItem
                                    item={item}
                                    viewableItems={viewableRefHubs.current}
                                />
                            );
                        }}
                    />
                </View>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: "absolute",
        top: 50,
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
    },
    button: {
        position: "absolute",
        top: 126,
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        position: "absolute",
        top: 170,
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
});

export default Spots;
