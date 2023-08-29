import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { theme } from "../util/theme";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
}

const SearchBar = ({
    searchQuery,
    setSearchQuery,
    placeholder = "Search",
}: SearchBarProps) => {
    return (
        <Searchbar
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            style={styles.search}
            inputStyle={styles.input}
        />
    );
};

const styles = StyleSheet.create({
    search: {
        width: "60%",
        alignSelf: "center",
        height: 45,
        backgroundColor: theme().colors.background,
        marginHorizontal: "4%",
    },
    input: {
        top: -6,
        left: -5,
        color: theme().colors.dark,
    },
});

export default SearchBar;
