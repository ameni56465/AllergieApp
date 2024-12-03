import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AllerMateScreen = () => {
  return (
    <View style={styles.container}>
      {/* Images du haut */}
      <Image
        source={require('./assets/image 1.png')} // Assurez-vous que le fichier existe
        style={styles.topLeftImage}
      />
      <Image
        source={require('./assets/image 2.png')} // Assurez-vous que le fichier existe
        style={styles.topRightImage}
      />

      {/* Conteneur principal des images */}
      <View style={styles.imageContainer}>
        <View style={styles.outerBackgroundSquare}>
          <Text style={styles.outerSquareText}>Welcome to</Text>
          <Text style={styles.outerSquareBrand}>AllerMate</Text>
        </View>
        <View style={styles.backgroundSquare} />
        <Image
          source={require('./assets/1906.i203.016.allergy_symptoms-removebg-preview.png')} // Assurez-vous que le fichier existe
          style={styles.mainImage}
        />
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.footerBackgroundSquare} />
        <View style={styles.footer}>
          <View style={styles.square} />
          <Text style={styles.footerText}>
            Track Your Allergies, Learn About Allergies, Emergency Guidance
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3366CC',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  topLeftImage: {
    width: 171,
    height: 132,
    position: 'absolute',
    top: 35,
    left: 3,
  },
  topRightImage: {
    width: 171,
    height: 132,
    position: 'absolute',
    top: 35,
    right: 3,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
  },
  outerBackgroundSquare: {
    position: 'absolute',
    width: 300,
    height: 150,
    backgroundColor: '#AAD1F7',
    right: 90,
    top: '39%',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  outerSquareText: {
    fontSize: 20,
    color: '#577CEF',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 25, // Ajuste l'espace à gauche
    top: '5%',
  },
  outerSquareBrand: {
    fontSize: 35,
    color: '#577CEF',
    fontWeight: 'bold',
    marginLeft: 10, // Ajuste l'espace à gauche
    top: '0%',
  },
  backgroundSquare: {
    position: 'absolute',
    width: 228,
    height: 307,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    right: -20,
    top: '25%',
    zIndex: 1,
  },
  mainImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    zIndex: 2,
  },
  footerContainer: {
    marginTop: 30,
    position: 'relative',
  },
  footerBackgroundSquare: {
    position: 'absolute',
    width: '100%',
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    bottom: 0,
    zIndex: 0,
    borderRadius: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  square: {
    width: 60,
    height: 7,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
    top: -80,
    borderRadius: 20,
  },
  footerText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    top: -80,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 44,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    top: -70,
  },
  buttonText: {
    color: '#577CEF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllerMateScreen;