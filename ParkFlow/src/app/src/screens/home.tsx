import * as Location from "expo-location";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "react-native-paper";
import BottomSheet, { BottomSheetRefProps } from "../components/bottomSheet";
import MenuButton from "../components/menuButton";
import SearchBar from "../components/searchBar";
import { MapDeltaInitial } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Home = ({ navigation }: { navigation: any }) => {
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [currentRegion, setCurrentRegion] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const bottomSheetRef = useRef<BottomSheetRefProps>(null);
    const onPress = useCallback(() => {
        bottomSheetRef.current?.scrollTo(-200);
    }, []);

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
        };

        getLocation();
    }, []);

    const mapRef = createRef<MapView>();

    //TODO: fix loading
    if (!initialRegion) return <Loading />;

    const markers = () => {
        return (
            <>
                <Marker
                    coordinate={{
                        latitude: 45.643762029499506,
                        longitude: 25.630817357450724,
                    }}
                    onPress={() => {
                        mapRef.current?.animateToRegion(
                            {
                                latitude: 45.643762029499506,
                                longitude: 25.630817357450724,
                                latitudeDelta: MapDeltaInitial,
                                longitudeDelta: MapDeltaInitial,
                            },
                            1000
                        );
                        onPress();
                    }}
                />
                <Marker
                    coordinate={{
                        latitude: 45.65385581575959,
                        longitude: 25.625012386590242,
                    }}
                    onPress={() => {
                        mapRef.current?.animateToRegion(
                            {
                                latitude: 45.65385581575959,
                                longitude: 25.625012386590242,
                                latitudeDelta: MapDeltaInitial,
                                longitudeDelta: MapDeltaInitial,
                            },
                            1000
                        );
                        onPress();
                    }}
                />
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
                    }}></View>
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
