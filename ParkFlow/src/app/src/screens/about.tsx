import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Image, Linking, ScrollView, StyleSheet, View } from "react-native";
import AboutItem from "../components/aboutItem";
import Background from "../components/background";
import Button from "../components/button";
import MenuButton from "../components/menuButton";
import Text from "../components/text";

const About = ({ navigation }: { navigation: any }) => {
    const scrollVieRef = useRef<ScrollView>(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        scrollVieRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }, [isFocused]);

    return (
        <Background>
            <View style={styles.topContainer}>
                <MenuButton navigation={navigation} />
            </View>
            <Image
                source={require("../../assets/images/onboarding/drive.png")}
                style={styles.image}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scroll}
                overScrollMode="never"
                ref={scrollVieRef}>
                <View
                    style={{
                        alignItems: "center",
                        width: "100%",
                        marginTop: 15,
                    }}>
                    <Text fontSize={16} center>
                        We are ParkFlow, a team of students from the National
                        College of Computer Science Grigore Moisil in Brasov,
                        who got together this year to participate in the
                        competition organized by the association Descopera-ti
                        Pasiunea in IT.
                    </Text>
                    <Button
                        text={"Learn more"}
                        width={200}
                        style={{ marginTop: 20 }}
                        onPress={() => {
                            Linking.openURL(
                                "https://www.facebook.com/parkflowbv"
                            );
                        }}
                    />
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}>
                        <AboutItem
                            name={"Bleotu Alexandru"}
                            description={"Frontend Developer"}
                            image={require("../../assets/images/default/profile.png")}
                        />
                        <AboutItem
                            name={"Burlacenco Ștefan"}
                            description={"Business Analyst"}
                            image={require("../../assets/images/default/profile.png")}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}>
                        <AboutItem
                            name={"Motoașcă Alexandru"}
                            description={"Backend Developer"}
                            image={require("../../assets/images/default/profile.png")}
                        />
                        <AboutItem
                            name={"Istratie Ștefan"}
                            description={"Embedded Developer"}
                            image={require("../../assets/images/default/profile.png")}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}>
                        <AboutItem
                            name={"Stan Anemona"}
                            description={"Digital designer"}
                            image={require("../../assets/images/default/profile.png")}
                        />
                        <AboutItem
                            name={"Macri Tudor"}
                            description={"Tester"}
                            image={require("../../assets/images/default/profile.png")}
                        />
                    </View>
                </View>
            </ScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: "absolute",
        top: 50,
        paddingHorizontal: 20,
        width: "100%",
    },
    scroll: {
        width: "90%",
        marginTop: 250,
    },
    image: {
        zIndex: -1,
        width: "100%",
        position: "absolute",
        top: 0,
        height: 250,
        borderWidth: 2,
        borderColor: "red",
    },
});

export default About;
