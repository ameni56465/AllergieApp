import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

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
      const response = await fetch('http://192.168.1.15:8000/api/users/login', {
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
      <View style={styles.passwordContainer}>
  <TextInput
    style={styles.passwordInput}
    placeholder="Enter your password"
    secureTextEntry={!passwordVisible} 
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity
    style={styles.eyeIcon}
    onPress={() => setPasswordVisible(!passwordVisible)} // Changer la visibilité
  >
    <Icon
      name={passwordVisible ? 'eye' : 'eye-off'} 
      size={24} // Taille de l'icône
      color="#666" // Couleur de l'icône
    />
  </TouchableOpacity>
</View>

     
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
          <Image source={{ uri: 'https://s2.qwant.com/thumbr/474x474/5/c/ccb21a50a15aacb3a08df04cf7925930c3a24e8f66738d6a4145c2d92d4565/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.9g4dkKVAUyciOuDI9_vEYQHaHa%26pid%3DApi&q=0&b=1&p=0&a=0' }} style={styles.iconn} />
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
 
  container: {flex: 1, backgroundColor: '#EDEDED', padding: 50,paddingHorizontal: responsiveWidth(5), },
   title: {fontSize: 20,fontWeight: 'bold',color: '#577CEF',marginBottom: 60,marginTop: 80,marginLeft: 15,fontFamily: 'Inter',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff10',
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    paddingHorizontal: 15,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14,
    shadowColor: '#000',
    
  },
  button: {
    backgroundColor: '#4461F2',
    marginLeft: 15,
    marginRight: 15,
     height: 50,
     padding:15,
     borderRadius: 10,
    
    marginTop:15,
    marginBottom: 35,
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
   
   
  },
  orText: {
    marginVertical: 20,
    marginHorizontal:3,
    color: '#667085',
    fontSize: 16,
    
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  line: {
    flex: 1,
    height: 1,
    marginLeft:15,
    marginRight:15,
    backgroundColor: '#B0B0B0',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  iconCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 80,
    height: 58,
    justifyContent: 'center', // Centre verticalement
  alignItems: 'center', // Centre horizontalement
   
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
  // Modifications dans le style
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
    marginLeft: 15,
    marginRight: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
  },
  eyeIcon: {
    marginLeft: 10, // Espacement entre le champ et l'icône
  
  
    },
  
  forgotText: { color: '#C7C7C7',fontSize: 14, textAlign: 'right', marginRight: 10 , marginBottom:30,marginTop:10},
   linkText: { color: '#577CEF', textAlign: 'center', marginTop:25,fontSize: 16,},
});

export default Login;