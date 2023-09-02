import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { theme } from "../util/theme";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
    style?: any;
}

const SearchBar = ({
    searchQuery,
    setSearchQuery,
    placeholder = "Search",
    style,
}: SearchBarProps) => {
    return (
        <Searchbar
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            style={[styles.search, style]}
            inputStyle={styles.input}
        />
    );
};

const styles = StyleSheet.create({
    search: {
        alignSelf: "center",
        height: 45,
        backgroundColor: theme().colors.white,
    },
    input: {
        top: -6,
        left: -5,
        color: theme().colors.dark,
    },
});

export default SearchBar;
