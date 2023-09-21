import * as Location from "expo-location";
import {
    createRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "react-native-paper";
import BottomSheet, { BottomSheetRefProps } from "../components/bottomSheet";
import MenuButton from "../components/menuButton";
import SearchBar from "../components/searchBar";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { SensorContext } from "../context/sensorContext";
import { MapDeltaInitial } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Home = ({ navigation }: { navigation: any }) => {
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [currentRegion, setCurrentRegion] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [sensors, setSensors] = useState<any>(null);
    const [currentSensor, setCurrentSensor] = useState<any>(null);

    const bottomSheetRef = useRef<BottomSheetRefProps>(null);
    const onPress = useCallback(() => {
        bottomSheetRef.current?.scrollTo(-200);
    }, []);

    const { userToken } = useContext(AuthContext);
    const { getClosest, getByID } = useContext(SensorContext);

    // TODO: make initial region change based on user location

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
        };

        getLocation();
    }, []);

    const mapRef = createRef<MapView>();

    // console.log(initialRegion);
    // console.log(sensors);

    // fix loading
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
                                mapRef.current?.animateToRegion(
                                    {
                                        latitude: sensor.latitude,
                                        longitude: sensor.longitude,
                                        latitudeDelta: MapDeltaInitial,
                                        longitudeDelta: MapDeltaInitial,
                                    },
                                    1000
                                );

                                setCurrentSensor(sensor);
                                onPress();
                            }}>
                            <Image
                                key={key}
                                source={require("../../assets/images/pin.png")}
                                style={{
                                    height: 40,
                                    aspectRatio: 1,
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
                {markers()}
            </MapView>

            <View style={styles.topContainer}>
                <MenuButton
                    navigation={navigation}
                    style={{
                        marginVertical: 10,
                    }}
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

            <BottomSheet ref={bottomSheetRef}>
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                    }}>
                    <Text>{currentSensor?.latitude}</Text>
                </View>
            </BottomSheet>
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
});

export default Home;
