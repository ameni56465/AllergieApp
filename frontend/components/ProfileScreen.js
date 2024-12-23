import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  // State for user data
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Simulate fetching user data from backend or local storage (e.g., Firebase, AsyncStorage)
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await axios.get("http://192.168.149.206:8000/api/users");
        setusers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };
  
    // Fetch user data from your API or authentication service
    // Here, for demonstration, we set mock data
    const userData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      age: '30',
      country: 'USA',
      profilePhoto: 'https://s1.qwant.com/thumbr/474x316/b/d/f04896edf0c93cc678efab34fc80bb83d7b706446172db2e743fe6a49f96e4/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.U7sVEkIaqVNEJ6Sw5i9aoQHaE8%26pid%3DApi&q=0&b=1&p=0&a=0', // URL or local URI
    };

    // Set the fetched data in state
    setFullName(userData.fullName);
    setEmail(userData.email);
    setAge(userData.age);
    setCountry(userData.country);
    setProfilePhoto(userData.profilePhoto);
  }, []);

  // Handle profile photo change (pick from gallery or camera)
  const handleProfilePhoto = () => {
    Alert.alert(
      'Choose an option',
      'Select a photo from gallery or take a new one',
      [
        {
          text: 'Gallery',
          onPress: () => pickImageFromGallery(),
        },
        {
          text: 'Camera',
          onPress: () => pickImageFromCamera(),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // Pick image from the gallery
  const pickImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    });

    if (result.assets) {
      setProfilePhoto(result.assets[0].uri); // Set the chosen photo URI
    }
  };

  // Pick image using the camera
  const pickImageFromCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    });

    if (result.assets) {
      setProfilePhoto(result.assets[0].uri); // Set the taken photo URI
    }
  };

  // Handle data submission (e.g., update profile on the server)
  const handleSubmit = () => {
    if (!fullName || !email || !age || !country) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Here, send the updated data to your backend
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with back arrow on the left and Profile text in the center */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.arrowButton}>
            <Icon name="arrow-back" size={24} color="#577CEF" />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Profile Photo with Camera icon */}
        <TouchableOpacity style={styles.photoContainer} onPress={handleProfilePhoto}>
          <Image
            style={styles.photo}
            source={
              profilePhoto
                ? { uri: profilePhoto } // Display the chosen photo
                : { uri: 'https://s1.qwant.com/thumbr/474x316/b/d/f04896edf0c93cc678efab34fc80bb83d7b706446172db2e743fe6a49f96e4/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.U7sVEkIaqVNEJ6Sw5i9aoQHaE8%26pid%3DApi&q=0&b=1&p=0&a=0' } // Default profile image URL
            }
          />
          <Icon name="camera-alt" size={30} color="#fff" style={styles.cameraIcon} />
        </TouchableOpacity>

        {/* Input Fields */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#544C4C"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#544C4C"
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor="#544C4C"
        />

        <Text style={styles.label}>Country/Region</Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholderTextColor="#544C4C"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EDEDED',
    padding: responsiveWidth(5),
    marginTop: responsiveHeight(6),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: '#577CEF',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    position: 'absolute',
    left: 0,
    right: 0,
    fontSize: responsiveFontSize(3),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: responsiveWidth(6),
  },
  arrowButton: {
    padding: 5,
  },
  photoContainer: {
    marginTop: 25,
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  photo: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ddd',
    marginBottom: 0,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00000080',
    borderRadius: 20,
    padding: 1.5,
  },
  label: {
    fontSize: responsiveFontSize(2),
    color: '#000000',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: responsiveWidth(5),
  },
  input: {
    height: responsiveHeight(6),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#ffffff80',
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    width: '90%',
    shadowColor: '#000',
    color: '#544C4C',
  },
  button: {
    backgroundColor: '#577CEF',
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '90%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
