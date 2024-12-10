import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/SignIn'; 
import Login from './components/Login';
import Onbording from './components/onbording';
import Overview from './components/Overview';
import ProfileScreen from './components/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="Onbording" screenOptions={{ headerShown: false }}>
    
        <Stack.Screen name="Onbording" component={Onbording} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
