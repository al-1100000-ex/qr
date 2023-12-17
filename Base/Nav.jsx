import {Text, View} from "react-native";
import styles from "./styles";

const Nav = (props) => {
    return (
        <View style={styles.nav}>
            <Text style={styles.nav__elem}>1</Text>
            <Text style={styles.nav__elem}>2</Text>
            <Text style={styles.nav__elem}>3</Text>
            <Text style={styles.nav__elem}>4</Text>
            <Text style={styles.nav__elem}>5</Text>
            <Text style={styles.nav__elem}>6</Text>
            <Text style={styles.nav__elem}>7</Text>
        </View>
    )
}

export default Nav;