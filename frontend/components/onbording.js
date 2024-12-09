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
    width: width * 0.8, // 80% of screen width
    height: height * 0.15, // 15% of screen height
    backgroundColor: 'white',
    right: width * 0.1, // 10% from the right
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    top: -height * 0.2, // 20% above the top
  },
  outerSquareText: {
    fontSize: width * 0.05, // 5% of screen width for font size
    color: '#577CEF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  outerSquareBrand: {
    fontSize: width * 0.08, // 8% of screen width for font size
    color: '#577CEF',
    fontWeight: 'bold',
  },
  backgroundSquare: {
    position: 'absolute',
    width: width * 0.6, // 60% of the screen width
    height: height * 0.35, // 35% of the screen height
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    right: width * 0.05, // 5% from the right
    top: height * 0.2, // 20% from the top
    zIndex: 1,
    marginRight: -width * 0.15, // Negative margin for 6.5% of screen width
    marginTop: -height * 0.51, // Negative margin for 37% of screen height
  },
  mainImage: {
    width: width * 0.6, // 60% of the screen width
    height: height * 0.4, // 40% of the screen height
    resizeMode: 'contain',
    zIndex: 2,
    marginLeft: width * 0.40, // 36% from the left
    top: -height * 0.140, // Negative margin for vertical positioning
  },
  footerContainer: {
    marginTop: height * 0.05, // 5% from the top
    position: 'relative',
    top: height * 0.05, // Adjust position based on screen size
  },
  footerBackgroundSquare: {
    width: '100%',
    height: height * 0.3, // 30% of the screen height
    backgroundColor: '#8aa7de',
    bottom: 0,
    zIndex: 0,
    borderRadius: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: height * 0.01, // 1% from the top of the footer background
    zIndex: 1,
  },
  square: {
    width: 60,
    height: 7,
    backgroundColor: '#D9D9D9',
    marginBottom: height * 0.02, // Margin adjusted based on screen height
    borderRadius: 20,
    top: -height * 0.25, // Negative margin for positioning it upwards
  },
  footerText: {
    fontSize: width * 0.04, // 4% of screen width for font size
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 5,
    marginTop: -height * 0.23, // Adjust top margin based on screen height
    marginBottom: height * 0.05, // Margin at the bottom
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.19, // 19% of screen width for button padding
    paddingVertical: height * 0.03, // 3% of screen height for button padding
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
    top: -height * 0.02, // Slight negative margin to position the button
    zIndex: 2,
  },
  buttonText: {
    color: '#5279F2',
    fontSize: width * 0.042, // 4.2% of screen width for button text
    fontWeight: 'bold',
    zIndex: 3,  // Ensure text is above the button itself
    position: 'absolute',  // Position text correctly within the button
    left: width * 0.08, // Center text horizontally inside button
    top: height * 0.015, // Adjust text position vertically
  },
});

export default AllerMateScreen;
