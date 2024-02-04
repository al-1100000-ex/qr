import {connect} from "react-redux";
import {Text, TouchableOpacity, View, Touchable, TouchableWithoutFeedback, Pressable} from "react-native";
import {mymenuStyle} from "./mymenuStyle";
import {addToCart, deleteCartItem} from "../reducers/CartReducer";
import {Swipeable} from "react-native-gesture-handler";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faChevronRight, faMinus, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {saveData} from "../functions";

const MyMenuListElements = (props) => {
    const addItemToCart = (allowCart) => {
        if (!props.cart || allowCart) {
            props.addToCart({
                type_id: props.type_id,
                item   : props.item
            });
        }
    }

    const onDelete = () => {
        props.deleteCartItem({
            type_id: props.type_id,
            ID     : props.item.ID
        });
    }

    const renderLeftActions = () => {
        if (props.cart) {
            return (
                <View style={mymenuStyle.deleteBoxContainer}>
                    <TouchableOpacity onPress={onDelete} style={mymenuStyle.deleteBox}>
                        <FontAwesomeIcon icon={faTrashAlt} color={'rgba(255,0,0,0.6)'}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <Swipeable renderLeftActions={renderLeftActions}
                   onSwipeableOpen={onDelete}
        >
            <TouchableOpacity onPress={addItemToCart} activeOpacity={0.6}>
                <View style={[mymenuStyle.itemHeader, mymenuStyle.itemContainer]}>
                    <View style={mymenuStyle.itemTextDesc}>
                        <Text>{props.item.Item}</Text>
                        <Text
                            style={mymenuStyle.itemDescription}>{props.item.Description}</Text>
                    </View>
                    {props.cart &&
                        <View style={mymenuStyle.itemAmountContainer}>
                            <TouchableOpacity onPress={onDelete}>
                                <FontAwesomeIcon icon={faMinus} />
                            </TouchableOpacity>
                            <Text>{props.item?.Amount}x</Text>
                            <TouchableOpacity onPress={() => addItemToCart(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={mymenuStyle.priceContainer}>
                        <Text style={mymenuStyle.price}>€{Number(props.item.Price).toFixed(2)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    saveData,
    addToCart,
    deleteCartItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenuListElements);