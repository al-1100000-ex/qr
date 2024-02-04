import {connect} from "react-redux";
import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import MyMenuListElements from "./MyMenuListElements";
import {mymenuStyle} from "./mymenuStyle";
import config from "../config";

const MyMenuListTypes = (props) => {
    const bgImg = {
        1: 'dalle_drinks.webp',
        2: 'dalle_appetizer.webp',
        3: 'dalle_entrees.webp',
        4: 'dalle_desserts.webp',
    }[props.type.ID] || '';

    return (
        <View style={mymenuStyle.typesContainer}>
            <ImageBackground source={{ uri: config.imageURL + bgImg }} resizeMode={'cover'} style={mymenuStyle.typeHeader}>
                <Text style={mymenuStyle.type}>{props.type.Type}</Text>
            </ImageBackground>
            <View style={mymenuStyle.itemOutsideContainer}>
                {Object.keys(props.type.Items).map(item => (
                    <MyMenuListElements
                        key={item}
                        item={props.type.Items[item]}
                        type_id={props.type.ID}
                        cart={props.cart}
                    />
                ))}
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MyMenuListTypes);