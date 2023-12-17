import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    main     : {
        backgroundColor: '#232323',
        height         : '100%',
    },
    text     : {
        color: 'white',
    },
    nav      : {
        position       : 'fixed',
        top            : 0,
        left           : 0,
        width          : '100%',
        backgroundColor: 'lightgrey',
        height         : 50,
        display        : 'flex',
        flexDirection  : 'row',
        justifyContent : 'space-between',
        alignItems     : 'center',
    },
    nav__elem: {
        padding        : 10,
        backgroundColor: 'pink',
    }
});

export default styles;