import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import {saveData} from "./functions";
import {setScanned} from "./reducers/baseReducer";

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

import {sleep} from "expo-cli/build/commands/utils/promise";
import MyMenuContainer from "./MyMenu/MyMenuContainer";
import LoadingContainer from "./Loading/LoadingContainer";
import {setTable, storeMenuList} from "./reducers/MyMenuReducer";
import Nav from "./Nav";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faQrcode} from "@fortawesome/free-solid-svg-icons";

const QR = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cam, setCam] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [restID, setRestID] = useState(null);
    const [table, setTable] = useState(null);
    const [resData, setResData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View><Text>Anfrage um Kameraerlaubnis...</Text></View>;
    }
    if (hasPermission === false) {
        return <View><Text>Kein Zugriff auf die Kamera</Text></View>;
    }

    const toggleCam = () => {
        setCam(!cam);
        setScanned(false);
    }

    const barCodeScanned = (e) => {
        setCam(false);
        const data = JSON.parse(e.data);
        if (data.ID) {
            setLoading(true);
            setRestID(data.ID)
            setTable(data.Table || null);
            props.setTable(data.Table || null);
            loadRestData(data.ID);
        }
    }

    const loadRestData = (ID) => {
        let fd = new FormData();
        fd.append('ID', ID);

        props.saveData({
            route   : 'getRestData',
            formData: fd,
            callBack: storeRestData,
            response: () => null,
        })
    }

    const storeRestData = async (data) => {
        setResData(data);
        await props.storeMenuList(data);
        await sleep(100);
        props.setScanned({ scanned: true });
        setScanned(true);
        setLoading(false);
        props.navigation.navigate('MyMenu');
    }

    if (loading) {
        return (
            <LoadingContainer/>
        )
    }

    return (
        <View style={styles.flex1}>
            <Nav navigation={props.navigation} comp={'qr'} />
            <View style={styles.div}>
                <TouchableOpacity style={styles.scan_button} onPress={toggleCam}>
                    <Text>Scan QR-Code</Text>
                    {/*<FontAwesomeIcon icon={faQrcode} />*/}
                </TouchableOpacity>
                {cam &&
                    <View style={styles.container}>
                        <Camera style={styles.camera} onBarCodeScanned={barCodeScanned}/>
                    </View>
                }
            </View>
        </View>
    );
}

const mapStateToProps = (state) => ({
    backButton  : state.base.backButton,
    directToComp: state.base.directToComp,
})

const mapDispatchToProps = {
    saveData,
    setScanned,
    storeMenuList,
    setTable,
}

export default connect(mapStateToProps, mapDispatchToProps)(QR);

const styles = StyleSheet.create({
    div          : {
        // backgroundColor: '#232323',
        height        : '100%',
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
    },
    scan_button  : {
        position       : 'absolute',
        top            : 80,
        backgroundColor: 'white',
        borderRadius   : 8,
        paddingVertical: 25,
        width          : '50%',
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center',
    },
    container    : {
        height      : 'fit-content',
        borderStyle : 'solid',
        borderWidth : 3,
        borderColor : 'grey',
        borderRadius: 60,
        overflow    : 'hidden',
    },
    camera       : {
        width : windowWidth - 10,
        height: (windowHeight * 0.5) - 10,
    },
    map_container: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top     : windowHeight - (windowHeight / 2),
        left    : 0,
        height  : '50%',
    },
    info         : {
        marginTop      : -80,
        backgroundColor: 'white',
        width          : '100%',
        height         : 80,
        justifyContent : 'center',
        alignItems     : 'flex-start',
        paddingLeft    : 10,
    },
    restName     : {
        fontWeight: 'bold',
        fontSize  : 16,
    },
    restAdress   : {
        color: 'grey'
    },
    map          : {
        ...StyleSheet.absoluteFillObject,
    },
});
