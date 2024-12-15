import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";

export default function Article({ navigation }) {
  const [articles, setArticles] = useState([]); // Liste des articles
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
  const [loading, setLoading] = useState(false); // Indicateur de recherche en cours
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [itemsPerPage] = useState(3); // Nombre d'articles par page

  // Fonction pour récupérer tous les articles
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://192.168.1.15:8000/api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
    }
  };

  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return `${description.substring(0, length)}...`;
    }
    return description;
  };

  // Fonction pour rechercher un article par nom
  const searchArticleByName = async () => {
    if (!searchTerm.trim()) {
      fetchArticles(); // Si le champ de recherche est vide, afficher tous les articles
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.1.15:8000/api/articles/search?name=${searchTerm}`
      );
      setArticles([response.data]); // Met à jour la liste avec les résultats
    } catch (error) {
      console.error("Erreur lors de la recherche de l'article :", error);
      setArticles([]); // Vide la liste si aucun article n'est trouvé
    } finally {
      setLoading(false);
    }
  };

  // Charger les articles au démarrage
  useEffect(() => {
    fetchArticles();
  }, []);

  // Pagination logic
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Calculate total number of pages
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => navigation.navigate("Overview")} // Navigate to the "Overview" screen
          >
            <Icon name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.ttitle}>Article and Tips</Text>
        </View>

        
      <View style={styles.searchContainer}>
         <View style={styles.searchInputContainer}>
          <TextInput
           style={styles.input}
           placeholder="Search for an article..."
           value={searchTerm}
           onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity
           onPress={searchArticleByName}
           disabled={loading}
            style={styles.iconContainer}
          >
            <Icon
              name="search"
             size={24}
             color={loading ? "#ddd" : "#555"}
            />
         </TouchableOpacity>
        </View>
     </View>


        {/* Liste des articles */}
        <FlatList
          data={currentArticles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.articleCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>
                {truncateDescription(item.description, 100)}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", {
                    article: item,
                  })
                }
              >
                <Text style={styles.readMore}>Read More</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No articles found.</Text>
          }
        />

        {/* Pagination Buttons */}
        <View style={styles.paginationContainer}>
          {Array.from({ length: totalPages }, (_, index) => (
            <TouchableOpacity
              key={index + 1}
              style={styles.pageButton}
              onPress={() => paginate(index + 1)}
            >
              <Text style={styles.pageButtonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(11), // Padding basé sur la largeur de l'écran
    backgroundColor: "#fff",
  },

    //button fleche  and ttitle(headerContainer,ttitle,arrowButton)
    headerContainer: {
      flexDirection: "row",
      marginTop: 30,
      marginBottom: 35,
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

 //button search
 searchInputContainer: {
  marginLeft:40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 5,
  paddingHorizontal: 8,
  height: 40,
  maxWidth: "70%",
 
  marginBottom: 20,
},
input: {
 
  height: "100%",
  paddingHorizontal: 10,
  fontSize: 16,
 
},
iconContainer: {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 5,
},



  // Carte d'article
  articleCard: {
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: responsiveHeight(20),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
  description: {
    fontSize: responsiveFontSize(1.8),
    color: "#555",
  },
  readMore: {
    color: "#1e90ff",
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    color: "#aaa",
    marginTop: responsiveHeight(3),
  },

  // Pagination
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(3),
  },
  pageButton: {
    marginHorizontal: responsiveWidth(1),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: "#577CEF",
    borderRadius: responsiveWidth(2),
  },
  pageButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
  },
});

