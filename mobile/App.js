import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Cairo_200ExtraLight,
  Cairo_300Light,
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_800ExtraBold,
  Cairo_900Black,
} from "@expo-google-fonts/cairo";
import AppNavigation from "./src/navigations/AppNavigation";
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

import { colors } from "./src/style/colors";
import moment from 'moment'
import 'moment/locale/fr'

export default function App() {
  let [fontsLoaded] = useFonts({
    Cairo_200ExtraLight,
    Cairo_300Light,
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
    Cairo_800ExtraBold,
    Cairo_900Black,
  });
  moment.locale('es')

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <PaperProvider >
      <AppNavigation />
    </PaperProvider>
    // <View style={styles.container}>
    // <StatusBar style="dark" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
