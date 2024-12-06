import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/SignIn'; 
import Login from './components/Login';
// import Onbording from './components/onbording'
 import Overview from './components/Overview'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="onbording" component={onbording}  screenOptions={{ headerShown: false }}/> */}
        <Stack.Screen name="SignIn" component={SignIn}  screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Overview" component={Overview} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
