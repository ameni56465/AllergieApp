import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const ProfileScreen = () => {
  // State for user data
  const [fullName, setFullName] = useState('imen');
  const [email, setEmail] = useState('imen@gmail.com');
  const [age, setAge] = useState('22');
  const [country, setCountry] = useState('Tunisia');
  const [profilePhoto, setProfilePhoto] = useState(null); // Profile photo state

  // Handle profile photo change
  const handleProfilePhoto = async () => {
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

  // Handle data submission
  const handleSubmit = () => {
    if (!fullName || !email || !age || !country) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    Alert.alert('Success', 'Profile updated successfully!');
    // Here, make an API call to save the updated profile data
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>

        {/* Profile Photo */}
        <TouchableOpacity style={styles.photoContainer} onPress={handleProfilePhoto}>
          <Image
            style={styles.photo}
            source={
              profilePhoto
                ? { uri: profilePhoto } // Display the chosen photo
                : { uri: 'https://s1.qwant.com/thumbr/474x316/b/d/f04896edf0c93cc678efab34fc80bb83d7b706446172db2e743fe6a49f96e4/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.U7sVEkIaqVNEJ6Sw5i9aoQHaE8%26pid%3DApi&q=0&b=1&p=0&a=0' } // Use the provided URL
            }
          />
          <Text style={styles.editPhoto}>📸 </Text>
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
    marginTop: responsiveHeight(6)
  },
  title: {
    fontSize: responsiveFontSize(3), 
    fontWeight: 'bold',
    color: '#577CEF',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
  },
  photoContainer: {
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
  editPhoto: {
    marginTop: responsiveHeight(1),
    color: '#4461F2',
    fontSize: responsiveFontSize(2), 
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
