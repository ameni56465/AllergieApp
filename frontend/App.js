import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/SignIn'; 
import Login from './components/Login';
import Onbording from './components/onbording'
import Overview from './components/overview'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>  {/* Wrap the Stack.Navigator in NavigationContainer */}
      <Stack.Navigator initialRouteName="Onbording" screenOptions={{ headerShown: false }}>
    
        <Stack.Screen name="Onbording" component={Onbording} />
        {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Overview" component={Overview} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
