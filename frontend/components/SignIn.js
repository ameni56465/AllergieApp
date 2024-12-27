import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert,Dimensions } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
const { width, height } = Dimensions.get('window'); 

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isValidEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (!fullName || !email || !age || !country || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.9:8000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, age, country, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
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
     
       <View style={styles.passwordContainer}>
       <TextInput
    style={styles.passwordInput}
    placeholder="Enter your password"
    secureTextEntry={!passwordVisible}
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconContainer}>
    <Icon
      name={passwordVisible ? 'eye' : 'eye-off'}
      size={20}
      color="#666"
    />
  </TouchableOpacity>
</View>



      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SignIn</Text>
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
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    padding: 50,
    paddingHorizontal: responsiveWidth(5),  // Responsive padding
    
  },
  title: {
    fontSize: 19, // Responsive font size
    fontWeight: 'bold',
    color: '#577CEF',
    marginBottom: responsiveHeight(5), // Responsive margin
    marginTop: responsiveHeight(8), // Adjusted for smaller devices
    marginLeft: responsiveWidth(5),
    fontFamily: 'Inter',
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
passwordContainer: {
  flexDirection: 'row', // Align input and icon horizontally
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
  flex: 1, // Take up remaining space
  fontSize: 14,
},
rText: {
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

  
});

export default SignIn;