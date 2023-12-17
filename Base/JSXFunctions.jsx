import React from "react";
import {Linking} from "react-native";

export const openLink = (url) => {
    openExternalLink(url).then(() => {

    }).catch(err => window.error(err));
}

const openExternalLink = async (url) => {
    try {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error(`Cannot open URL: ${url}`);
        }
    } catch (error) {
        console.error('An error occurred while trying to open the URL:', error);
    }
};