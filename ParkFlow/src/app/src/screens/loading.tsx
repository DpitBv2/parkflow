import { ActivityIndicator } from "react-native-paper";
import Background from "../components/background";
import { theme } from "../util/theme";

const Loading = () => {
    return (
        <Background>
            <ActivityIndicator size="large" color={theme().colors.primary} />
        </Background>
    );
};

export default Loading;
