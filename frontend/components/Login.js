import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("Attempting to login with email:", email, "and password:", password);
    try {
      const response = await fetch('http://192.168.1.17:8000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Ensure 'email' is being used here
      });
  
      const data = await response.json();
      console.log("Backend Response:", data);
  
      if (response.ok) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Overview'); // Navigate to Overview screen
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server.');
      console.error("Login error:", error); // Log error details
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{" >> Login to continue"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.forgotText}>Recover Password?</Text>

      <Text style={styles.orText}>Or continue with</Text>

      <View style={styles.iconContainer}>
        <Image source={{ uri: 'google-icon-url' }} style={styles.icon} />
        <Image source={{ uri: 'apple-icon-url' }} style={styles.icon} />
        <Image source={{ uri: 'facebook-icon-url' }} style={styles.icon} />
      </View>

      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('SignIn')}
      >
        Don't have an account? Register here!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5, backgroundColor: '#fff', borderColor: '#ddd' },
  button: { backgroundColor: '#4461F2', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  forgotText: { color: '#888', textAlign: 'center', marginVertical: 10 },
  orText: { marginTop: 40, marginBottom: 10, textAlign: 'center', color: '#888' },
  iconContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  icon: { width: 40, height: 40, marginHorizontal: 10 },
  linkText: { color: '#577CEF', textAlign: 'center', marginTop: 10 },
});

export default Login;
