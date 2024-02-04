import {StyleSheet} from "react-native";

export const navStyle = StyleSheet.create({
    nav               : {
        padding       : 15,
        display       : 'flex',
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems    : 'center',
    },
    touch             : {
        alignSelf: 'flex-start',
        position : 'relative',
    },
    cartCountContainer: {
        position       : 'absolute',
        bottom         : -5,
        right          : -5,
        backgroundColor: 'orange',
        width          : 12,
        height         : 12,
        borderRadius   : 10,
        display        : "flex",
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',

    },
    cartCount         : {
        fontSize: 8,
        color   : 'black',
    }
})