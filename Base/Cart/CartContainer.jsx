import {connect} from "react-redux";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {cartStyle} from "./cartStyle";
import Nav from "../Nav";
import React, {useEffect} from "react";
import MyMenuContainer from "../MyMenu/MyMenuContainer";

const CartContainer = (props) => {
    return (
        <View>
            <Nav navigation={props.navigation} />
            <View style={cartStyle.cart}>
                <ScrollView style={cartStyle.cartList}>
                    {props.cart.list && Object.keys(props.cart.list).length > 0 &&
                        <MyMenuContainer
                            data={{Items: props.cart.list}}
                            cart
                        />
                    }
                </ScrollView>
                <TouchableOpacity style={cartStyle.checkOut}>
                    <Text style={cartStyle.checkOutText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);