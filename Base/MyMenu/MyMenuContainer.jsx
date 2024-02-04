import {ScrollView, Text, View, TouchableOpacity, RefreshControl} from "react-native";
import {connect} from "react-redux";
import {StyleSheet} from "react-native";
import CheckoutScreen from "../Payment/CheckoutScreen";
import MyMenuListTypes from "./MyMenuListTypes";
import {mymenuStyle} from "./mymenuStyle";
import LoadingContainer from "../Loading/LoadingContainer";
import Nav from "../Nav";
import React, {useEffect, useState} from "react";
import {sleep} from "expo-cli/build/commands/utils/promise";
import {storeMenuList} from "../reducers/MyMenuReducer";
import {saveData} from "../functions";
import styles from "../styles";

const MyMenuContainer = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(props.data || props.myMenu.list);

    if (!props.myMenu) {
        return (
            <LoadingContainer/>
        )
    }
    const restaurantData = props.myMenu.list.Restaurant;
    const table = props.myMenu.table;

    useEffect(() => {
        if(!props.cart) {
            setData(props.myMenu.list);
        }else{
            setData(props.data);
        }
    }, [props.myMenu.list, props.data]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        loadRefreshedData();
    }, [])

    const loadRefreshedData = () => {
        let fd = new FormData();
        fd.append('ID', restaurantData.ID);

        props.saveData({
            route   : 'getRestData',
            formData: fd,
            callBack: storeRestData,
            response: () => null,
        })
    }

    const storeRestData = async (data) => {
        await props.storeMenuList(data);
        setRefreshing(false);
    }

    return (
        <View style={styles.flex1}>
            {!props.cart &&
                <Nav navigation={props.navigation}/>
            }
            <View style={mymenuStyle.menu}>
                <View style={mymenuStyle.header}>
                    <View>
                        <Text style={mymenuStyle.headerText}>{restaurantData.Name}</Text>
                        <Text style={[mymenuStyle.itemDescription, mymenuStyle.headerText]}>Table: {table}</Text>
                    </View>
                    <View>
                        <Text style={mymenuStyle.headerText}>{restaurantData.Zip_Code} {restaurantData.City}</Text>
                        <Text
                            style={[mymenuStyle.itemDescription, mymenuStyle.headerText]}>{restaurantData.Street}</Text>
                    </View>
                </View>
                <ScrollView
                    refreshControl={!props.cart && <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    style={mymenuStyle.scollableMenuList}
                >
                    <View style={{paddingBottom: 15}}>
                        {Object.keys(data.Items).map((type) => (
                            <MyMenuListTypes
                                key={type}
                                type={data.Items[type]}
                                cart={props.cart}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    myMenu: state.myMenu,
})

const mapDispatchToProps = {
    saveData,
    storeMenuList,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenuContainer);