import * as Location from "expo-location";
import {
    createRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "react-native-paper";
import BottomSheet, { BottomSheetRefProps } from "../components/bottomSheet";
import { AuthContext } from "../context/authContext";
import { MapDegreesInitial } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Home = () => {
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [currentRegion, setCurrentRegion] = useState<any>(null);
    const [showButton, setShowButton] = useState<boolean>(false);

    const { logout }: any = useContext(AuthContext);

    const bottomSheetRef = useRef<BottomSheetRefProps>(null);
    const onPress = useCallback(() => {
        bottomSheetRef.current?.scrollTo(-200);
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.error("Location permission not granted");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            const initial = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: MapDegreesInitial,
                longitudeDelta: MapDegreesInitial,
            };

            setInitialRegion(initial);
            setCurrentRegion(initial);
            console.log(location);
        })();
    }, []);

    // TODO: fix hiding button after recentering
    useEffect(() => {
        if (currentRegion !== initialRegion) setShowButton(true);
        else setShowButton(false);
    }, [currentRegion]);

    const mapRef = createRef<MapView>();

    if (!initialRegion) return <Loading />;

    const markers = () => {
        return (
            <>
                <Marker
                    coordinate={{
                        latitude: 45.643762029499506,
                        longitude: 25.630817357450724,
                    }}
                    onPress={onPress}
                />
                <Marker
                    coordinate={{
                        latitude: 45.65385581575959,
                        longitude: 25.625012386590242,
                    }}
                    onPress={onPress}
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
                mapType="standard">
                {markers()}
            </MapView>

            <IconButton
                icon="crosshairs-gps"
                iconColor={theme().colors.primary}
                size={30}
                style={styles.button}
                onPress={() => {
                    mapRef.current?.animateToRegion(initialRegion, 1000);
                }}
            />

            <IconButton
                icon="menu"
                iconColor={theme().colors.primary}
                size={30}
                style={styles.logout}
                onPress={() => logout()}
            />

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
    button: {
        position: "absolute",
        top: 40,
        right: 10,
        backgroundColor: theme().colors.background,
    },
    logout: {
        position: "absolute",
        top: 40,
        left: 10,
        backgroundColor: theme().colors.background,
    },
});

export default Home;
