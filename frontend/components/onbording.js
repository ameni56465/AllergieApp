import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AllerMateScreen = () => {
  const getButtonStyles = (size = 2) => {
    const buttonHeight = size * 50;
    return {
      backgroundColor: '#ffffff',
      paddingHorizontal: 20,
      paddingVertical: buttonHeight * 0.1,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  return (
    <View style={styles.container}>
      {/* Images du haut */}
      <Image
        source={require('./assets/image 1.png')}
        style={styles.topLeftImage}
      />
      <Image
        source={require('./assets/image 2.png')}
        style={styles.topRightImage}
      />

      {/* Conteneur principal */}
      <View style={styles.imageContainer}>
        <View style={styles.outerBackgroundSquare}>
          <Text style={styles.outerSquareText}>Welcome to</Text>
          <Text style={styles.outerSquareBrand}>AllerMate</Text>
        </View>
        <View style={styles.backgroundSquare} />
        <Image
          source={require('./assets/1906.i203.016.allergy_symptoms-removebg-preview.png')}
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
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.05,
  },
  topLeftImage: {
    width: width * 0.4,
    height: height * 0.2,
    position: 'absolute',
    top: height * 0.05,
    left: 5,
  },
  topRightImage: {
    width: width * 0.4,
    height: height * 0.2,
    position: 'absolute',
    top: height * 0.05,
    right: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  outerBackgroundSquare: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.15,
    backgroundColor: '#AAD1F7',
    right: width * 0.1,
    top: height * 0.32,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    left:-20,
  },
  outerSquareText: {
    fontSize: width * 0.05,
    color: '#577CEF',
    fontWeight: 'bold',
    marginLeft:10,
  },
  outerSquareBrand: {
    fontSize: width * 0.08,
    color: '#577CEF',
    fontWeight: 'bold',
    
  },
  backgroundSquare: {
    position: 'absolute',
    width: width * 0.6,
    height: height * 0.4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    right: width * 0.05,
    top: height * 0.2,
    zIndex: 1,
    marginRight:-40,
  },
  mainImage: {
    width: width * 0.5,
    height: height * 0.3,
    resizeMode: 'contain',
    zIndex: 2,
    marginLeft:130,
    top:25,
  },
  footerContainer: {
    marginTop: height * 0.05,
    position: 'relative',
  },
  footerBackgroundSquare: {
    position: 'absolute',
    width: '100%',
    height: height * 0.3,
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
    borderRadius: 20,
    top:-70,
  },
  footerText: {
    fontSize: width * 0.05,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    top:-50,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.02,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    top:-30,
  },
  buttonText: {
    color: '#577CEF',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default AllerMateScreen;
