import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AllerMateScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login'); // Navigates to the "Login" screen
  };

  return (
    <View style={styles.container}>
      {/* Images at the top */}
      <Image source={require('../assets/image 1.png')} style={styles.topLeftImage} />
      <Image source={require('../assets/image 2.png')} style={styles.topRightImage} />

      {/* Main Content */}
      <View style={styles.imageContainer}>
        <View style={styles.outerBackgroundSquare}>
          <Text style={styles.outerSquareText}>Welcome to</Text>
          <Text style={styles.outerSquareBrand}>AllerMate</Text>
        </View>
        <View style={styles.backgroundSquare} />
        <Image
          source={require('../assets/1906.i203.016.allergy_symptoms-removebg-preview.png')}
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
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
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
    backgroundColor: '#5279F2',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.6,
  },
  topLeftImage: {
    width: width * 0.3,
    height: height * 0.2,
    position: 'absolute',
    top: height * 0.05,
  },
  topRightImage: {
    width: width * 0.5,
    height: height * 0.2,
    position: 'absolute',
    top: height * 0.05,
    right: -1,
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
    backgroundColor: 'white',
    right: width * 0.1,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    top: -155,
  },
  mainImage: {
    width: width * 0.6,
    height: height * 0.4,
    resizeMode: 'contain',
    zIndex: 2,
    marginLeft: 147,
    top: -105,
  },
  outerSquareText: {
    fontSize: width * 0.05,
    color: '#577CEF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  outerSquareBrand: {
    fontSize: width * 0.08,
    color: '#577CEF',
    fontWeight: 'bold',
  },
  backgroundSquare: {
    position: 'absolute',
    width: width * 0.6,
    height: height * 0.35,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    right: width * 0.05,
    top: height * 0.2,
    zIndex: 1,
    marginRight: -65,
    marginTop: -370,
  },
  footerContainer: {
    marginTop: height * 0.05,
    position: 'relative',
    top: 50,
  },
  footerBackgroundSquare: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: '#8aa7de',
    bottom: 0,
    zIndex: 0,
    borderRadius: 10,
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
    top: -200,
  },
  footerText: {
    fontSize: width * 0.04,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 5,
    marginTop: -180,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.19,
    paddingVertical: height * 0.03,
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
    top: -20,
    zIndex: 2,
  },
  buttonText: {
    color: '#5279F2',
    fontSize: width * 0.042,
    fontWeight: 'bold',
    zIndex: 3,  // Ensure text is above the button itself
    position: 'absolute',  // Keep it positioned correctly within the button
    left:28,
    top:10
  }
});

export default AllerMateScreen;
