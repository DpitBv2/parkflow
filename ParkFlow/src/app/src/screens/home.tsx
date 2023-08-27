import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { theme } from "../util/theme";

import * as Location from "expo-location";
import { createRef, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { MapDegreesInitial } from "../util/constants";
import Loading from "./loading";

const Home = () => {
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [currentRegion, setCurrentRegion] = useState<any>(null);
    const [showButton, setShowButton] = useState<boolean>(false);

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

        console.log(currentRegion);
        console.log(initialRegion);
        console.log(" ");
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
                />
                <Marker
                    coordinate={{
                        latitude: 45.65385581575959,
                        longitude: 25.625012386590242,
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
                onRegionChange={setCurrentRegion}
                mapType="standard">
                {markers()}
            </MapView>
            {showButton && (
                <IconButton
                    icon="crosshairs-gps"
                    iconColor={theme().colors.primary}
                    size={30}
                    style={styles.button}
                    onPress={() => {
                        mapRef.current?.animateToRegion(initialRegion, 1000);
                    }}
                />
            )}
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
});

export default Home;
