import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

export default function Details({ route }) {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  const { article } = route.params; // Récupère les données de l'article passé depuis la navigation

  return (
    
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => navigation.navigate("Overview")} // Navigate to the "Overview" screen
          >
            <Icon name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

        <Text style={styles.ttitle}>Details</Text>
      </View>

      <View style={styles.articleCard}>
        {/* Affiche la photo de l'article */}
        <Image source={{ uri: article.imageUrl }} style={styles.image} />

        {/* Affiche le nom de l'article */}
        <Text style={styles.title}>{article.name}</Text>

        {/* Affiche la description complète */}
        <Text style={styles.description}>{article.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 45,
    backgroundColor: "#fff",
  },
  
  //button fleche  and ttitle(headerContainer,ttitle,arrowButton)
  headerContainer: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 40,
  },
  ttitle: {
    fontSize: 20,
    margintop:25,
    fontWeight: "bold",
    color: "#577CEF",
    textAlign: "center", // Centrer le texte
    justifyContent: "center",
    fontFamily: "Inter",
    flex: 1, // Permet au titre de prendre tout l'espace disponible
  },
  arrowButton: {
    position: "absolute", // Positionner le bouton à gauche
    left:0, // Espacement par rapport au bord gauche
    justifyContent: "center",
    alignItems: "center",
    width: 30, // Largeur du bouton
    height:30, // Hauteur du bouton
    backgroundColor: "#577CEF", // Couleur de fond
    borderRadius: 20, // Rendre le bouton circulaire
    shadowColor: "#000", // Ajout d'une ombre
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Ombre sur Android
  },


  articleCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
