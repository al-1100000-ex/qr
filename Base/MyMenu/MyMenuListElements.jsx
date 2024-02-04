import {connect} from "react-redux";
import {Text, TouchableOpacity, View} from "react-native";
import {mymenuStyle} from "./mymenuStyle";
import {addToCart} from "../reducers/CartReducer";

const MyMenuListElements = (props) => {
    const addItemToCart = () => {
        if (!props.cart) {
            props.addToCart({
                type_id: props.type_id,
                item   : props.item
            });
        }
    }

    console.log(55, props.item);

    return (
        <TouchableOpacity style={mymenuStyle.itemContainer} onPress={addItemToCart}>
            <View style={mymenuStyle.itemHeader}>
                <View>
                    <Text>{props.item.Item}</Text>
                    <Text
                        style={mymenuStyle.itemDescription}>{props.item.Description}</Text>
                </View>
                <Text>€{Number(props.item.Price).toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenuListElements);