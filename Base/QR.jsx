import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {saveData} from "./functions";

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

import './../assets/Element-BAWE.png';
import {sleep} from "expo-cli/build/commands/utils/promise";

const QR = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cam, setCam] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [restID, setRestID] = useState(null);
    const [resData, setResData] = useState({});
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

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
            setRestID(data.ID)
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
        setLat(Number(data.Latitude));
        setLng(Number(data.Longitude));
        setResData(data);
        await sleep(100);
        setScanned(true);
    }

    return (
        <View style={styles.div}>
            <TouchableOpacity style={styles.scan_button} onPress={toggleCam}>
                <Text>Scan QR-Code</Text>
            </TouchableOpacity>
            {cam &&
                <View style={styles.container}>
                    <Camera style={styles.camera} onBarCodeScanned={barCodeScanned}/>
                </View>
            }
            {scanned && resData && lat && lng &&
                <View style={styles.map_container}>
                    <View style={styles.info}>
                        <Text style={styles.restName}>{resData.Name}</Text>
                        {resData.Street && resData.Zip_Code && resData.City &&
                            <Text
                                style={styles.restAdress}>{resData.Street + ', ' + resData.Zip_Code + ' ' + resData.City}</Text>
                        }
                    </View>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude      : lat,
                            longitude     : lng,
                            latitudeDelta : 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        mapType={'satellite'}
                    >
                        <Marker
                            title={resData.Name || ''}
                            description={(resData.Zip_Code.toString() || '') + ' ' + (resData.City || '')}
                            coordinate={{
                                latitude : lat,
                                longitude: lng,
                            }}
                        />
                    </MapView>
                </View>
            }
        </View>
    );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    saveData,
}

export default connect(mapStateToProps, mapDispatchToProps)(QR);

const styles = StyleSheet.create({
    div          : {
        backgroundColor: '#232323',
        height         : '100%',
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center',
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
        marginTop      : -50,
        backgroundColor: 'white',
        width          : '100%',
        height         : 50,
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
