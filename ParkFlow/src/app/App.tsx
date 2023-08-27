import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/authContext";
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
        <PaperProvider theme={theme()}>
            <AuthProvider>
                <AppNavigation />
            </AuthProvider>
        </PaperProvider>
    );
};

export default App;
