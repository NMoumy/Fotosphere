import { View, Text, Button } from "react-native";
import React from "react";
import { genererUtilisateur } from "../services/firebase/generateurUtilisateurs";

export default function EcranAjoutPost() {
  return (
    <View>
      <Text>EcranAjoutPost</Text>
      <Button onPress={genererUtilisateur} title="Ajouter un post" />
    </View>
  );
}
