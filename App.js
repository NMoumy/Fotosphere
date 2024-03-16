import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
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
import EcranModifProfil from "./app/screens/EcranModifProfil";
import EcranPostDetail from "./app/screens/EcranPostDetail";
import EcranProfilAutre from "./app/screens/EcranProfilAutre";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

// Pour la police d'écriture
SplashScreen.preventAutoHideAsync();

// Pour la navigation
const Stack = createNativeStackNavigator();

export default function App() {
  // Changement de la couleur de la barre de navigation
  NavigationBar.setBackgroundColorAsync("black");

  // Chargement des polices
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
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Stack.Navigator initialRouteName="Connexion" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Accueil" component={EcranAccueil} />
          <Stack.Screen name="AjoutPost" component={EcranAjoutPost} />
          <Stack.Screen name="Intro" component={EcranIntro} />
          <Stack.Screen name="Connexion" component={EcranConnexion} />
          <Stack.Screen name="Inscription" component={EcranInscription} />
          <Stack.Screen name="Profil" component={EcranProfil} />
          <Stack.Screen name="Parametre" component={EcranParametre} />
          <Stack.Screen name="ModifProfil" component={EcranModifProfil} />
          <Stack.Screen name="PostDetail" component={EcranPostDetail} />
          <Stack.Screen name="ProfilAutre" component={EcranProfilAutre} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
