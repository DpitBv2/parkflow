import * as Font from "expo-font";
import { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/authContext";
import AppNavigation from "./src/navigation/appNavigation";
import Loading from "./src/screens/loading";
import { theme } from "./src/theme/theme";

const loadFonts = async () => {
    await Font.loadAsync({
        "AnekLatinRegular": require("./assets/fonts/anekLatin/AnekLatinRegular.ttf"),
        "AnekLatinBold": require("./assets/fonts/anekLatin/AnekLatinBold.ttf"),
    });
};

const App = () => {
    useEffect(() => {
        loadFonts();
    }, []);

    if (!Font.isLoaded) return <Loading />;

    return (
        <PaperProvider theme={theme()}>
            <AuthProvider>
                <AppNavigation />
            </AuthProvider>
        </PaperProvider>
    );
};

export default App;
