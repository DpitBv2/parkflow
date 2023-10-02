import * as Location from "expo-location";
import {
    createRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { IconButton } from "react-native-paper";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet, { BottomSheetRefProps } from "../components/bottomSheet";
import Button from "../components/button";
import MenuButton from "../components/menuButton";
import Modal from "../components/modal";
import SearchBar from "../components/searchBar";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { SensorContext } from "../context/sensorContext";
import { ActiveOpacity, MapDeltaInitial } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Home = ({ navigation }: { navigation: any }) => {
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [currentRegion, setCurrentRegion] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [sensors, setSensors] = useState<any>(null);
    const [currentSensor, setCurrentSensor] = useState<any>(null);
    const [reserved, setReserved] = useState<boolean>(false);
    const [parked, setParked] = useState<boolean>(false);

    const [seconds, setSeconds] = useState<number>(0);

    const bottomSheetRef = useRef<BottomSheetRefProps>(null);

    const onPressOpen = useCallback((height: number) => {
        bottomSheetRef.current?.scrollTo(height);
    }, []);
    const onPressClose = useCallback(() => {
        bottomSheetRef.current?.scrollTo(50);
    }, []);

    const { userToken } = useContext(AuthContext);
    const { getClosest, reserve, park, endReservation, getReserved } =
        useContext(SensorContext);

    const [distance, setDistance] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);

    // TODO: make initial region change based on user location

    useEffect(() => {
        // const interval = setInterval(() => {
        //     setSeconds((prevSeconds) => prevSeconds + 1);
        // }, 1000);
        // return () => clearInterval(interval);
    }, [parked]);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.error("Location permission not granted");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            const initial = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: MapDeltaInitial,
                longitudeDelta: MapDeltaInitial,
            };

            setInitialRegion(initial);
            if (currentRegion === null) setCurrentRegion(initial);

            await getClosest(userToken, initial.latitude, initial.longitude)
                .then((res: any) => {
                    setSensors(res);
                })
                .catch((error: any) => {
                    console.log(error);
                });

            await getReserved(userToken)
                .then((res: any) => {
                    if (res !== null) {
                        setReserved(true);
                        if (!res.lifted) setParked(true);
                        setCurrentSensor(res);
                        setSeconds(
                            Math.floor(
                                -(
                                    new Date(
                                        res.reservationStartTimestamp
                                    ).getTime() - Date.now()
                                ) / 1000
                            )
                        );
                        onPressOpen(-190);
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                });
        };

        getLocation();
    }, []);

    const mapRef = createRef<MapView>();

    if (initialRegion === null || sensors === null) return <Loading />;

    const markers = () => {
        return (
            <>
                {sensors.map((sensor: any, key: any) => {
                    return (
                        <Marker
                            key={key}
                            coordinate={{
                                latitude: sensor.latitude,
                                longitude: sensor.longitude,
                            }}
                            onPress={() => {
                                if (currentSensor === null)
                                    setCurrentSensor(sensor);
                                else onPressOpen(reserved ? -190 : -150);
                            }}>
                            <Image
                                key={key}
                                source={require("../../assets/images/pin.png")}
                                style={{
                                    height: 50,
                                    width: 47,
                                }}
                            />
                        </Marker>
                    );
                })}
            </>
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                initialRegion={initialRegion}
                rotateEnabled={false}
                onRegionChange={setCurrentRegion}
                moveOnMarkerPress={false}
                showsCompass={false}
                mapType="standard">
                {currentSensor !== null && (
                    <MapViewDirections
                        origin={initialRegion}
                        destination={currentSensor}
                        strokeWidth={5}
                        strokeColor={
                            reserved
                                ? theme().colors.succes
                                : theme().colors.primary
                        }
                        apikey="AIzaSyAazdNjj3DF3yNBf80UqbmN7oVKIGOyEUE"
                        mode={"DRIVING"}
                        onReady={(result: any) => {
                            setDistance(result.distance);
                            mapRef.current?.animateToRegion(
                                {
                                    latitude: currentSensor.latitude,
                                    longitude: currentSensor.longitude,
                                    latitudeDelta: MapDeltaInitial / 5,
                                    longitudeDelta: MapDeltaInitial / 5,
                                },
                                1000
                            );
                            onPressOpen(reserved ? -190 : -150);
                        }}
                    />
                )}
                {markers()}
            </MapView>

            <View style={styles.topContainer}>
                <MenuButton
                    navigation={navigation}
                    style={{
                        marginVertical: 10,
                    }}
                    onPress={onPressClose}
                />

                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    style={{ marginHorizontal: 10, flex: 1 }}
                />

                <IconButton
                    icon="crosshairs-gps"
                    iconColor={theme().colors.primary}
                    size={30}
                    containerColor={theme().colors.white}
                    style={{
                        marginTop: 8,
                        marginHorizontal: 0,
                    }}
                    onPress={() => {
                        mapRef.current?.animateToRegion(initialRegion, 1000);
                    }}
                />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                midTranslateY={reserved ? -190 : -150}>
                <View style={styles.bottomSheet}>
                    {currentSensor !== null && (
                        <View>
                            <TouchableOpacity
                                activeOpacity={ActiveOpacity}
                                style={styles.iconContainer}
                                onPress={() => {
                                    setCurrentSensor(null);
                                    onPressClose();
                                }}>
                                <FAIcon
                                    name="times"
                                    color={theme().colors.white}
                                    size={17}
                                />
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row" }}>
                                <Text fontSize={18} overflow>
                                    {currentSensor.address.street + " - "}
                                </Text>
                                <Text fontSize={18} bold>
                                    {distance.toFixed(2) + " km "}
                                </Text>
                                <Text fontSize={18}>away</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    marginTop: 15,
                                }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}>
                                    <Text fontSize={18}>LEI </Text>
                                    <Text fontSize={18} bold>
                                        2.50/hour
                                        {/* {currentSensor.reservationPricePerHour + "/hour"} */}
                                    </Text>
                                    <Text fontSize={18}> parking</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginLeft: "auto",
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

                                    <Text
                                        fontSize={16}
                                        bold
                                        style={{ marginLeft: 5 }}>
                                        7791
                                    </Text>
                                </View>
                            </View>
                            {reserved && (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        marginTop: 15,
                                    }}>
                                    <MIcon
                                        name="clock"
                                        size={20}
                                        color={theme().colors.primary}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginLeft: 5,
                                            bottom: 3,
                                        }}>
                                        <Text fontSize={18}>Duration: </Text>
                                        <Text fontSize={18} bold>
                                            {Math.floor(
                                                seconds / 60
                                            ).toLocaleString("en-US", {
                                                minimumIntegerDigits: 2,
                                                useGrouping: false,
                                            }) +
                                                ":" +
                                                (seconds % 60).toLocaleString(
                                                    "en-US",
                                                    {
                                                        minimumIntegerDigits: 2,
                                                        useGrouping: false,
                                                    }
                                                )}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            <View style={styles.line} />
                            <View style={{ alignItems: "center" }}>
                                {!reserved ? (
                                    <Button
                                        text={"Reserve / Park"}
                                        onPress={() => {
                                            setVisible(true);
                                        }}
                                        width={"100%"}
                                    />
                                ) : !parked ? (
                                    <View style={{ flexDirection: "row" }}>
                                        <Button
                                            text={"Park"}
                                            backgroundColor={
                                                theme().colors.succes
                                            }
                                            onPress={() => {
                                                park(
                                                    userToken,
                                                    currentSensor.id
                                                )
                                                    .then((res: any) => {
                                                        setParked(true);
                                                    })
                                                    .catch((error: any) => {
                                                        console.log(error);
                                                    });
                                            }}
                                            width={"50%"}
                                            style={{ marginRight: 10 }}
                                        />
                                        <Button
                                            text={"Cancel"}
                                            backgroundColor={
                                                theme().colors.danger
                                            }
                                            onPress={() => {
                                                endReservation(
                                                    userToken,
                                                    currentSensor.id,
                                                    "9917"
                                                )
                                                    .then((res: any) => {
                                                        setReserved(false);
                                                        setParked(false);
                                                        onPressOpen(-150);
                                                        setSeconds(0);
                                                    })
                                                    .catch((error: any) => {
                                                        console.log(error);
                                                    });
                                            }}
                                            width={"50%"}
                                        />
                                    </View>
                                ) : (
                                    <Button
                                        text={"Cancel"}
                                        backgroundColor={theme().colors.danger}
                                        onPress={() => {
                                            endReservation(
                                                userToken,
                                                currentSensor.id,
                                                "9917"
                                            )
                                                .then((res: any) => {
                                                    setReserved(false);
                                                    setParked(false);
                                                    onPressOpen(-150);
                                                    setSeconds(0);
                                                })
                                                .catch((error: any) => {
                                                    console.log(error);
                                                });
                                        }}
                                        width={"100%"}
                                    />
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </BottomSheet>
            <Modal
                visible={visible}
                setVisible={setVisible}
                onClose={() => setVisible(false)}
                width={300}>
                <Text bold fontSize={18} style={{ paddingTop: 10 }} center>
                    Confirm command
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <Button
                        text="Reserve"
                        onPress={() => {
                            setVisible(false);
                            reserve(userToken, currentSensor.id)
                                .then((res: any) => {
                                    setReserved(true);
                                    setCurrentSensor(res);
                                    setSeconds(0);
                                    onPressOpen(-190);
                                })
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        }}
                        style={{ marginTop: 30 }}
                        width={125}
                        backgroundColor={theme().colors.primary}
                    />
                    <Button
                        text="Park"
                        onPress={() => {
                            setVisible(false);
                            if (!reserved)
                                reserve(userToken, currentSensor.id)
                                    .then((res: any) => {
                                        setReserved(true);
                                        setCurrentSensor(res);
                                        setSeconds(0);
                                        onPressOpen(-190);

                                        park(userToken, currentSensor.id)
                                            .then((res: any) => {
                                                setParked(true);
                                            })
                                            .catch((error: any) => {
                                                console.log(error);
                                            });
                                    })
                                    .catch((error: any) => {
                                        console.log(error);
                                    });
                            else
                                park(userToken, currentSensor.id)
                                    .then((res: any) => {
                                        setSeconds(0);
                                        setParked(true);
                                        onPressOpen(-190);
                                    })
                                    .catch((error: any) => {
                                        console.log(error);
                                    });
                        }}
                        style={{ marginTop: 30, marginLeft: 10 }}
                        width={125}
                        backgroundColor={theme().colors.succes}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme().colors.background,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    topContainer: {
        position: "absolute",
        top: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    bottomSheet: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: theme().colors.dark,
        marginLeft: 2,
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: theme().colors.grey,
        marginVertical: 17,
    },
    iconContainer: {
        height: 25,
        width: 25,
        borderRadius: 100,
        backgroundColor: theme().colors.danger,

        position: "absolute",
        top: -20,
        right: -10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home;
