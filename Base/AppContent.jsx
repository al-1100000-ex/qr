import {connect} from "react-redux";
import {View} from "react-native";
import {saveData} from "./functions";
import QR from "./QR";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {StyleSheet} from "react-native";

const AppContent = () => {
    return (
        <View>
            <QR />
        </View>
    )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    saveData,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContent)