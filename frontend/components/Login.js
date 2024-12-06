import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Validate email format
  const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Handle login
  console.log(email)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.14:8000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Overview'); 
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server.');
      console.error('Login error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'>> Login to continue'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email/fullname"
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

     
      <Text style={styles.forgotText}>Recover Password ?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LogIn</Text>
      </TouchableOpacity>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.line} />
      </View>


      <View style={styles.cardContainer}>
        <View style={styles.iconCard}>
          <Image source={{ uri: 'https://s2.qwant.com/thumbr/474x474/5/3/a1ad406273cf1ec7f6b727ab71fc2975951f0f661b764d0c4d17a0cb1c6f5d/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.EhTMbGiYfYzQnWLgjZaoJAHaHa%26pid%3DApi&q=0&b=1&p=0&a=0' }} style={styles.icon} />
        </View>
        <View style={styles.iconCard}>
          <Image source={{ uri: 'https://s2.qwant.com/thumbr/474x474/5/c/ccb21a50a15aacb3a08df04cf7925930c3a24e8f66738d6a4145c2d92d4565/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.9g4dkKVAUyciOuDI9_vEYQHaHa%26pid%3DApi&q=0&b=1&p=0&a=0' }} style={styles.icon} />
        </View>
        <View style={styles.iconCard}>
          <Image source={{ uri: 'https://s2.qwant.com/thumbr/474x474/e/5/fc52f899ab57b207cd263df3b0bf875c669d0e0917bc2c7720ef10a93f5f11/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.GWN566zsDm2sLaZ11uCo2QHaHa%26pid%3DApi&q=0&b=1&p=0&a=0' }} style={styles.icon} />
        </View>
      </View>

      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('SignIn')}
      >
        if you don't have an account                                                                      you can Register here !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {flex: 1, backgroundColor: '#EDEDED', padding: 20, },
   title: {fontSize: 20,fontWeight: 'bold',color: '#577CEF',marginBottom: 30,marginTop: 80,marginLeft: 15,fontFamily: 'Inter',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff10',
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    paddingHorizontal: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14,
    shadowColor: '#000',
  },
  button: {
    backgroundColor: '#4461F2',
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop:15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    marginVertical: 20,
    textAlign: 'center',
    color: '#667085',
    fontSize: 14,
    fontWeight: '500',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#B0B0B0',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    margin: 20,
    marginTop:15,
   
    
  },
  iconCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
  },
  
  forgotText: { color: '#C7C7C7', textAlign: 'right', marginRight: 10 , marginBottom:20},
   linkText: { color: '#577CEF', textAlign: 'center', marginTop:60},
});

export default Login;