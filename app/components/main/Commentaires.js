import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Commentaires({ commentaires }) {
    if (!commentaires) {
        return null;
    }

    return (
        <ScrollView style={styles.conteneur}>
            {commentaires.map((commentaire, index) => (
                <View key={index} style={styles.commentaire}>
                    <Text style={styles.utilisateur}>{commentaire.userId ? commentaire.userId.pseudo : 'Utilisateur inconnu'}</Text>
                    <Text style={styles.texte}>{commentaire.message}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conteneur: {
        padding: 10,
    },
    commentaire: {
        marginBottom: 10,
    },
    utilisateur: {
        fontWeight: "bold",
    },
    texte: {
        marginLeft: 5,
    },
});