import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/authContext";
import { SensorProvider } from "./src/context/sensorContext";
import AppNavigation from "./src/navigation/appNavigation";
import { theme } from "./src/util/theme";

const App = () => {
    // const [fontLoaded, setFontLoaded] = useState(false);

    // useEffect(() => {
    //     Font.loadAsync({
    //         AnekLatinRegular: require("./assets/fonts/anekLatin/AnekLatinRegular.ttf"),
    //         AnekLatinBold: require("./assets/fonts/anekLatin/AnekLatinBold.ttf"),
    //     }).then(() => {
    //         setFontLoaded(true);
    //     });
    // }, []);

    // if (fontLoaded) return <Loading />;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={theme()}>
                <SensorProvider>
                    <AuthProvider>
                        <AppNavigation />
                    </AuthProvider>
                </SensorProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
};

export default App;
