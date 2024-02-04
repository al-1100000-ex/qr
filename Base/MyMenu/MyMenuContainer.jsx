import {ScrollView, Text, View, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {StyleSheet} from "react-native";
import CheckoutScreen from "../Payment/CheckoutScreen";
import MyMenuListTypes from "./MyMenuListTypes";
import {mymenuStyle} from "./mymenuStyle";
import LoadingContainer from "../Loading/LoadingContainer";
import Nav from "../Nav";
import React, {useEffect} from "react";

const MyMenuContainer = (props) => {
    if(!props.myMenu) {
        return (
            <LoadingContainer />
        )
    }

    const data = props.data || props.myMenu.list;
    const restaurantData = props.myMenu.list.Restaurant;
    const table = props.myMenu.table;

    console.log(1,data);

    return (
        <View>
            {!props.cart &&
                <Nav navigation={props.navigation} />
            }
            <View style={mymenuStyle.menu}>
                <View style={mymenuStyle.header}>
                    <View>
                        <Text style={mymenuStyle.headerText}>{restaurantData.Name}</Text>
                        <Text style={[mymenuStyle.itemDescription, mymenuStyle.headerText]}>Table: {table}</Text>
                    </View>
                    <View>
                        <Text style={mymenuStyle.headerText}>{restaurantData.Zip_Code} {restaurantData.City}</Text>
                        <Text style={[mymenuStyle.itemDescription, mymenuStyle.headerText]}>{restaurantData.Street}</Text>
                    </View>
                </View>
                <ScrollView>
                    {Object.keys(data.Items).map((type) => (
                        <MyMenuListTypes
                            key={type}
                            type={data.Items[type]}
                            cart={props.cart}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    myMenu: state.myMenu,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenuContainer);