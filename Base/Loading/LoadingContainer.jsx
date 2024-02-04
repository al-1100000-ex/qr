import {ActivityIndicator, View} from "react-native";
import React from "react";
import {loadingStyle} from "./loadingStyle";

const LoadingContainer = () => {
    return (
        <View style={loadingStyle.container}>
            <ActivityIndicator color={'white'} size={100} />
        </View>
    )
}

export default LoadingContainer;