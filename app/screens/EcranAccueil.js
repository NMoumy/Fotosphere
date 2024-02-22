import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import Entete from "../components/accueil/Entete";
import CategoriePhoto from "../components/accueil/CategoriePhoto";

export default function App() {
  return (
    <SafeAreaView style={styles.conteneur}>
      <Entete />
      <CategoriePhoto />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});
