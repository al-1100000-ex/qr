import {SafeAreaView, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import QR from "./Base/QR";
import QRCode from "react-native-qrcode-svg";
import AppContent from "./Base/AppContent";
import {Provider} from "react-redux";
import store from "./Base/store";
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const App = () => {
    const QRData = {
        ID: 1,
        type: 'scan',
        userID: {
            ID: 1539,
            Name: 'Alex Hinterleitner',
        },
        eventLocation: {
            ID: 4182,
            web: 'https://alexhinterleitner.com/',
            coords: {
                X: 48.149881,
                Y: 16.293193,
            },
            menuFile: 'https://alexhinterleitner.com/BAWE',
        }
    }

  return (
      <Provider store={store}>
          <SafeAreaView>
              {/*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>*/}
              {/*    <QRCode value={JSON.stringify(QRData)} size={200} />*/}
              {/*</View>*/}
              {/*<QR />*/}
              <StatusBar style='auto' hidden />
              {/*<AppContent />*/}
              <AppContent />
          </SafeAreaView>
      </Provider>
  );
}

export default App;