import {Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCartShopping, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {setDirectToComp, setScanned, toggleBackButton} from "./reducers/baseReducer";
import {connect} from "react-redux";
import {navStyle} from "./Nav/navStyle";

const Nav = (props) => {
    const goBack = () => {
        if (props.navigation.canGoBack()) {
            props.navigation.goBack();
        } else {
            props.setScanned(false);
            props.navigation.navigate('Home');
        }
    }

    const openCart = () => {
        props.navigation.navigate('Cart')
    }

    return (
        <View style={navStyle.nav}>
            <TouchableOpacity style={navStyle.touch} onPress={goBack}>
                <FontAwesomeIcon icon={faChevronLeft} color={'white'}/>
            </TouchableOpacity>
            {(props.base.scanned && props.comp !== 'qr') &&
                <TouchableOpacity style={navStyle.touch} onPress={openCart}>
                    <FontAwesomeIcon icon={faCartShopping} color={'white'}/>
                    {props.cart.count > 0 &&
                        <View style={navStyle.cartCountContainer}>
                            <Text style={navStyle.cartCount}>{props.cart.count}</Text>
                        </View>
                    }
                </TouchableOpacity>
            }
        </View>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    base: state.base,
})

const mapDispatchToProps = {
    toggleBackButton,
    setDirectToComp,
    setScanned,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);