import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/SignIn'; 
import Login from './components/Login';
import Onbording from './components/onbording';
import Overscreen from './components/overview'
import Tabbar from './components/tabbar';
import SettingsScreen  from './components/settings';
import EmergencyScreen from './components/EmergencyScreen'
import Scan from './components/Scancode'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="Onbording" screenOptions={{ headerShown: false }}>
    
        <Stack.Screen name="Onbording" component={Onbording} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="Emergency" component={Emergency} />
        <Stack.Screen name="Scancode" component={Scancode} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

function Overview({  navigation }) {
  return (
    <>
      <Overscreen/>

      <Tabbar navigation={navigation} />
    </>
  );
}

function Emergency({  navigation }) {
  return (
    <>
      < EmergencyScreen/>

      <Tabbar navigation={navigation} />
    </>
  );
}

function Settings({  navigation }) {
  return (
    <>
      <SettingsScreen/>

      <Tabbar navigation={navigation} />
    </>
  );
}
function Scancode({  navigation }) {
  return (
    <>
      < Scan/>

      <Tabbar navigation={navigation} />
    </>
  );}

export default App;
