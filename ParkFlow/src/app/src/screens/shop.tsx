import { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import FIcon from "react-native-vector-icons/FontAwesome5";
import Background from "../components/background";
import Button from "../components/button";
import MenuButton from "../components/menuButton";
import Modal from "../components/modal";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ShopContext } from "../context/shopContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Shop = ({ navigation }: { navigation: any }) => {
    const [sensorsCounter, setSensorsCounter] = useState(0);
    const [hubsCounter, setHubsCounter] = useState(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [sensorVisible, setSensorVisible] = useState(false);
    const [hubVisible, setHubVisible] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);

    const [orderCompleteVisible, setOrderCompleteVisible] = useState(false);
    const [orderFailedVisible, setOrderFailedVisible] = useState(false);

    const { purchase } = useContext(ShopContext);
    const { userToken, getRole } = useContext(AuthContext);

    if (isLoading) return <Loading />;

    return (
        <Background>
            <View style={styles.topContainer}>
                <MenuButton navigation={navigation} />
                <Text bold fontSize={25} style={{ flex: 1 }} center>
                    Shop
                </Text>
                <View style={{ position: "relative" }}>
                    <IconButton
                        icon="cart"
                        iconColor={theme().colors.primary}
                        containerColor={theme().colors.white}
                        size={30}
                        onPress={() => setCartVisible(true)}
                    />
                    {sensorsCounter + hubsCounter !== 0 && (
                        <View style={styles.dot} />
                    )}
                </View>
            </View>
            <View style={{ height: "100%", width: "100%", top: 125 }}>
                <View style={styles.shopItem}>
                    <Image
                        source={require("../../assets/images/shop/sensor1.png")}
                        style={styles.image}
                    />
                    <IconButton
                        icon="information"
                        iconColor={theme().colors.white}
                        size={40}
                        style={styles.info}
                        onPress={() => setSensorVisible(true)}
                    />
                    <View style={styles.text}>
                        <View>
                            <Text fontSize={19} bold>
                                ParkFlow Spot
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text fontSize={17}>Price: </Text>
                                <Text bold fontSize={17}>
                                    LEI 599.00
                                </Text>
                            </View>
                        </View>
                        <Button
                            text="Add to Cart"
                            width={120}
                            style={styles.button}
                            onPress={() =>
                                setSensorsCounter(sensorsCounter + 1)
                            }
                        />
                    </View>
                </View>
                <View style={styles.shopItem}>
                    <Image
                        source={require("../../assets/images/shop/hub.png")}
                        style={styles.image}
                    />
                    <IconButton
                        icon="information"
                        iconColor={theme().colors.white}
                        size={40}
                        style={styles.info}
                        onPress={() => setHubVisible(true)}
                    />
                    <View style={styles.text}>
                        <View>
                            <Text fontSize={19} bold>
                                ParkFlow HUB
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text fontSize={17}>Price: </Text>
                                <Text bold fontSize={17}>
                                    LEI 299.00
                                </Text>
                            </View>
                        </View>
                        <Button
                            text="Add to Cart"
                            width={120}
                            style={styles.button}
                            onPress={() => setHubsCounter(hubsCounter + 1)}
                        />
                    </View>
                </View>
            </View>
            <Modal
                visible={cartVisible}
                setVisible={setCartVisible}
                onClose={() => setCartVisible(false)}
                width={350}>
                <Text
                    bold
                    fontSize={20}
                    style={{ paddingTop: 10, marginBottom: 10 }}
                    center>
                    Cart
                </Text>
                <View style={styles.detail}>
                    <Text>ParkFlow Spot </Text>
                    <Text bold style={{ marginLeft: 10 }}>
                        {sensorsCounter}
                    </Text>
                    <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                        <TouchableOpacity
                            activeOpacity={ActiveOpacity}
                            style={styles.icon}>
                            <FIcon
                                name="plus"
                                size={15}
                                color={theme().colors.white}
                                onPress={() =>
                                    setSensorsCounter(sensorsCounter + 1)
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={ActiveOpacity}
                            style={styles.icon}>
                            <FIcon
                                name="minus"
                                size={15}
                                color={theme().colors.white}
                                onPress={() =>
                                    setSensorsCounter(sensorsCounter - 1)
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.detail}>
                    <Text>ParkFlow HUB </Text>
                    <Text bold style={{ marginLeft: 10 }}>
                        {hubsCounter}
                    </Text>
                    <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                        <TouchableOpacity
                            activeOpacity={ActiveOpacity}
                            style={styles.icon}>
                            <FIcon
                                name="plus"
                                size={15}
                                color={theme().colors.white}
                                onPress={() => setHubsCounter(hubsCounter + 1)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={ActiveOpacity}
                            style={styles.icon}>
                            <FIcon
                                name="minus"
                                size={15}
                                color={theme().colors.white}
                                onPress={() => setHubsCounter(hubsCounter - 1)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line} />
                <View style={{ flexDirection: "row" }}>
                    <Text fontSize={17}>Price: </Text>
                    <Text bold fontSize={17} style={{ marginLeft: "auto" }}>
                        LEI{" "}
                        {(599 * sensorsCounter + 299 * hubsCounter).toFixed(2)}
                    </Text>
                </View>
                <Button
                    text="Complete Order"
                    width="100%"
                    style={{ marginTop: 20 }}
                    disabled={sensorsCounter + hubsCounter === 0}
                    onPress={() => {
                        setIsLoading(true);
                        purchase(hubsCounter, sensorsCounter, userToken)
                            .then(() => {
                                setOrderCompleteVisible(true);
                                setCartVisible(false);
                                setIsLoading(false);
                                setSensorsCounter(0);
                                setHubsCounter(0);
                                getRole();
                            })
                            .catch((err: any) => {
                                console.log(err);
                                setOrderFailedVisible(true);
                                setCartVisible(false);
                                setIsLoading(false);
                            });
                    }}
                />
            </Modal>
            <Modal
                visible={sensorVisible}
                setVisible={setSensorVisible}
                onClose={() => setSensorVisible(false)}
                width={300}>
                <Text bold fontSize={18} style={{ paddingTop: 10 }} center>
                    ParkFlow Spot
                </Text>
                <Text justify style={{ paddingTop: 15 }}>
                    The Parkflow sensor is a vital hardware component designed
                    to enhance parking management systems. Installed on each
                    parking space, these devices provide real-time monitoring to
                    determine if a spot is currently occupied or available.
                    Through the Low-Power Wide-Area Network (LoRa) communication
                    protocol, the sensors are seamlessly connected to the
                    central hub. This efficient connectivity ensures prompt and
                    accurate updates regarding parking space availability.
                </Text>
            </Modal>
            <Modal
                visible={hubVisible}
                setVisible={setHubVisible}
                onClose={() => setHubVisible(false)}
                width={300}>
                <Text bold fontSize={18} style={{ paddingTop: 10 }} center>
                    ParkFlow HUB
                </Text>
                <Text justify style={{ paddingTop: 15 }}>
                    The Parkflow hub serves as the central nerve center of the
                    Parkflow system, facilitating seamless communication and
                    connectivity. Strategically placed in various locations,
                    these hubs play a pivotal role in collecting data from
                    multiple sensors and enabling communication between them and
                    the central server. They boast a range of sophisticated
                    functionalities designed to optimize the parking experience.
                </Text>
            </Modal>
            <Modal
                visible={orderCompleteVisible}
                setVisible={setOrderCompleteVisible}
                onClose={() => setOrderCompleteVisible(false)}
                width={300}>
                <Text bold fontSize={18} style={{ paddingTop: 10 }} center>
                    Order Complete
                </Text>
                <Text justify style={{ paddingTop: 15 }}>
                    Your order has been completed successfully.
                </Text>
            </Modal>
            <Modal
                visible={orderFailedVisible}
                setVisible={setOrderFailedVisible}
                onClose={() => setOrderFailedVisible(false)}
                width={300}>
                <Text bold fontSize={18} style={{ paddingTop: 10 }} center>
                    Order Failed
                </Text>
                <Text justify style={{ paddingTop: 15 }}>
                    Your order has failed. Please try again later.
                </Text>
            </Modal>
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
    shopItem: {
        width: "88%",
        height: "39%",
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: theme().colors.white,
        marginBottom: 20,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "75%",
        resizeMode: "cover",
        top: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        transform: [{ scale: 1 }],
    },
    text: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    button: {
        marginTop: 5,
        marginLeft: "auto",
    },
    dot: {
        borderRadius: 50,
        position: "absolute",
        width: 10,
        height: 10,
        top: 8,
        right: 8,
        backgroundColor: theme().colors.danger,
    },
    info: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    detail: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        alignItems: "center",
    },
    icon: {
        borderRadius: 50,
        backgroundColor: theme().colors.primary,
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        alignSlef: "center",
        marginLeft: 20,
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: theme().colors.grey,
        marginVertical: 15,
    },
});

export default Shop;
