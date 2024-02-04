import {Dimensions, StyleSheet} from "react-native";

export const cartStyle = StyleSheet.create({
    cart        : {
        width   : '100%',
        height  : '100%',
        position: 'relative',
    },
    cartList    : {
        maxHeight: Dimensions.get('window').height - 90,
    },
    checkOut    : {
        width          : '100%',
        height         : 50,
        backgroundColor: 'rgba(100,100,100,0.6)',
        color          : 'white',
        display        : 'flex',
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
    },
    checkOutText: {
        color: 'white',
    }
})