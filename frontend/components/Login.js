import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
const { width } = Dimensions.get('window');
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Validate email format
  const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Handle login
  console.log(password)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email.')  
      return;
    }
    
  
    try {
      const response = await fetch('http://192.168.1.11:8000/api/users/login', {
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
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••••"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
</View>

     
<Text style={styles.forgotText}>Recover Password ?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.iconCard}>
          <Image
            source={{
              uri: 'https://s2.qwant.com/thumbr/474x474/5/3/a1ad406273cf1ec7f6b727ab71fc2975951f0f661b764d0c4d17a0cb1c6f5d/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.EhTMbGiYfYzQnWLgjZaoJAHaHa%26pid%3DApi&q=0&b=1&p=0&a=0',
            }}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconCard}>
          <Image
            source={{
              uri: 'https://s2.qwant.com/thumbr/474x474/5/c/ccb21a50a15aacb3a08df04cf7925930c3a24e8f66738d6a4145c2d92d4565/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.9g4dkKVAUyciOuDI9_vEYQHaHa%26pid%3DApi&q=0&b=1&p=0&a=0',
            }}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconCard}>
          <Image
            source={{
              uri: 'https://s2.qwant.com/thumbr/474x474/e/5/fc52f899ab57b207cd263df3b0bf875c669d0e0917bc2c7720ef10a93f5f11/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.GWN566zsDm2sLaZ11uCo2QHaHa%26pid%3DApi&q=0&b=1&p=0&a=0',
            }}
            style={styles.icon}
          />
        </View>
      </View>
    

      <Text
        style={styles.linkText}
    
      >
        if you don't have an account
      </Text>
      <Text style={styles.linkText1}>
        you can <Text style={styles.registerText} onPress={() => navigation.navigate('SignIn')}>Register here!</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {flex: 1, backgroundColor: '#EDEDED', padding: 50,paddingHorizontal: responsiveWidth(5), },
   title: {fontSize: 19,fontWeight: 'bold',color: '#577CEF',marginBottom: 60,marginTop: 80,marginLeft: 15,fontFamily: 'Inter',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff10',
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 14,
    width: '100%', // Full width of the container
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff10',
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%', // Full width of the container
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotText: {
    color: '#C7C7C7',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: width * 0.05, 
  },
  button: {
    backgroundColor: '#4461F2',
    height: 50,
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 35,
    width: '90%',
    alignSelf: 'center', 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  orText: {
    marginVertical: 20,
    marginHorizontal:3,
    color: '#667085',
    fontSize: 14,
    
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#B0B0B0',
    marginHorizontal: width * 0.03, // Dynamic spacing
  },
  orText: {
    color: '#667085',
    fontSize: 14,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute cards evenly
    marginVertical: 20,
  },
  iconCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width * 0.2, // 20% of the screen width
    height: width * 0.12, // Maintain aspect ratio dynamically
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    margin:15
  },
  iconn: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    margin:15  },
  
    linkText: {
      color: '#646C7A',
      textAlign: 'center',
      marginTop: width * 0.05, // 5% of screen width
      fontSize: width * 0.04, // 4% of screen width for scaling font size
    },
    linkText1: {
      color: '#646C7A',
      textAlign: 'center',
      fontSize: width * 0.04, // Same scaling as linkText
      marginTop: width * 0.01, // Add vertical spacing between lines
    },
    registerText: {
      color: '#577CEF',
      fontWeight: 'bold',
    },
});

export default Login;