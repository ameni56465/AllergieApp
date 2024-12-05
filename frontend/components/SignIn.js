import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, } from 'react-native';

const SignIn = ({ navigation }) => {
  // State variables to store user inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');

  // Function to handle the Sign-Up process
  const handleSignUp = async () => {
    try {
      console.log("Sending registration request...");
  
      const response = await fetch('http://192.168.1.17:8000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, age, country, password }),
      });
  
      const data = await response.json();
      
      console.log('Response:', response);
      console.log('Data:', data);
  
      if (response.ok) {
        // Registration is successful
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      } else {
        // If there's an error from the server
        Alert.alert('Error', data.message || 'An error occurred');
      }
  
    } catch (error) {
      console.error("Caught error:", error); // Log detailed error information
      Alert.alert('Error', 'Unable to connect to the server.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'>> Register here to continue'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your fullname"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Region/country"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SignIn</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with</Text>

      <View style={styles.iconContainer}>
        <Image source={{ uri: 'google-icon-url' }} style={styles.icon} />
        <Image source={{ uri: 'apple-icon-url' }} style={styles.icon} />
        <Image source={{ uri: 'facebook-icon-url' }} style={styles.icon} />
      </View>

      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login here!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' ,color: '#577CEF'},
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5, backgroundColor: '#fff', borderColor: '#ddd' },
  button: { backgroundColor: '#4461F2', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orText: { marginTop: 20, marginBottom: 10, textAlign: 'center', color: '#888' },
  iconContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  icon: { width: 40, height: 40, marginHorizontal: 10 },
  linkText: { color: '#4A90E2', textAlign: 'center', marginTop: 10 },
});

export default SignIn;
