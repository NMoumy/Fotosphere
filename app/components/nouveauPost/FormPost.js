// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// export default function FormPost() {
//   const [description, setDescription] = useState("");

//   const soumettre = () => {
//     console.log(description);
//     // Ici, vous pouvez gérer la soumission du formulaire
//   };

//   return (
//     <View style={styles.conteneur}>
//       <TextInput
//         value={description}
//         onChangeText={setDescription}
//         placeholder="Ajoutez une description à votre image"
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//       />
//       <Button title="Soumettre" onPress={soumettre} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   conteneur: {
//     flex: 1,
//     justifyContent: "space-around",

//   },
// });