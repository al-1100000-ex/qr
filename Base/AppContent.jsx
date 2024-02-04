import {connect} from "react-redux";
import {ImageBackground, View} from "react-native";
import {saveData} from "./functions";
import QR from "./QR";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {StyleSheet} from "react-native";
import Nav from "./Nav";
import MenuContainer from "./MyMenu/MyMenuContainer";
import config from "./config";
import styles from "./styles";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import MyMenuContainer from "./MyMenu/MyMenuContainer";
import CartContainer from "./Cart/CartContainer";

const Stack = createStackNavigator();

const AppContent = (props) => {
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
        },
    };

    return (
        <View>
            <ImageBackground source={{ uri: config.imageURL + 'dalle_realistic.webp' }} resizeMode={'cover'}>
                <View style={props.scanned ? styles.mainDimmed : styles.main}>
                    <NavigationContainer theme={navTheme}>
                        <Stack.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Home" component={QR} />
                            <Stack.Screen name="MyMenu" component={MyMenuContainer} />
                            <Stack.Screen name="Cart" component={CartContainer} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = (state) => ({
    scanned: state.base.scanned,
})

const mapDispatchToProps = {
    saveData,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContent)