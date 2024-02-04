import {StyleSheet} from "react-native";

export const mymenuStyle = StyleSheet.create({
    menu                : {
        width : '100%',
        height: '100%',
    },
    header              : {
        width            : '100%',
        color            : 'white',
        display          : 'flex',
        flexDirection    : 'row',
        justifyContent   : 'space-between',
        alignItems       : 'center',
        paddingHorizontal: 20,
        paddingVertical  : 10,
    },
    headerText          : {
        color: 'white',
    },
    typesContainer      : {
        padding      : 20,
        paddingBottom: 0,
        marginTop    : -10,
    },
    typeHeader          : {
        borderRadius  : 20,
        overflow      : "hidden",
        height        : 60,
        alignItems    : 'center',
        justifyContent: 'center',
        position      : 'relative',
        zIndex        : 2,
    },
    type                : {
        width            : '100%',
        display          : 'flex',
        justifyContent   : 'center',
        alignItems       : 'center',
        paddingVertical  : 10,
        paddingHorizontal: 20,
        fontWeight       : 'bold',
        color            : 'white',
        fontSize         : 18,
    },
    itemOutsideContainer: {
        position       : 'relative',
        paddingTop     : 40,
        marginTop      : -40,
        backgroundColor: 'white',
        zIndex         : 1,
        borderRadius   : 30,
        paddingBottom  : 10,
    },
    itemContainer       : {
        width            : '100%',
        paddingHorizontal: 20,
        paddingVertical  : 7,
    },
    itemHeader          : {
        display       : 'flex',
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems    : 'center',
    },
    itemDescription     : {
        fontSize : 8,
        fontStyle: "italic",
    }
})