import {SafeAreaView, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import QR from "./Base/QR";
import QRCode from "react-native-qrcode-svg";
import AppContent from "./Base/AppContent";
import {Provider} from "react-redux";
import store from "./Base/store";
import {enableLatestRenderer} from 'react-native-maps';
import AppWrapper from "./Base/AppContent";
import styles from "./Base/styles";

enableLatestRenderer();

const App = () => {
  return (
      <Provider store={store}>
          <SafeAreaView style={styles.flex1}>
              <StatusBar style='auto' />
              <AppWrapper />
          </SafeAreaView>
      </Provider>
  );
}

export default App;