import { useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import EcranAccueil from "./app/screens/EcranAccueil";
import EcranAjoutPost from "./app/screens/EcranAjoutPost";
import EcranIntro from "./app/screens/EcranIntro";
import EcranConnexion from "./app/screens/EcranConnexion";
import EcranInscription from "./app/screens/EcranInscription";
import EcranProfil from "./app/screens/EcranProfil";
import EcranParametre from "./app/screens/EcranParametre";

SplashScreen.preventAutoHideAsync();

export default function App() {
  NavigationBar.setBackgroundColorAsync("transparent");

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": require("./app/assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./app/assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Medium": require("./app/assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./app/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Regular": require("./app/assets/fonts/Inter-Regular.ttf"),
    "Poppins-ExtraBold": require("./app/assets/fonts/Poppins-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <EcranAccueil /> */}
      {/* <EcranAjoutPost /> */}
      {/* <EcranIntro /> */}
      <EcranConnexion />
      {/* <EcranInscription /> */}
      {/* <EcranProfil /> */}
      {/* <EcranParametre /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
