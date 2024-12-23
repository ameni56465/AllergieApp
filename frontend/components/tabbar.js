import React, { useState } from 'react'; 
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const ICON_SIZE = 30;
  const SCAN_ICON_SIZE = 40;

  const NavButton = ({ name, onPress, isActive, size }) => (
    <TouchableOpacity style={styles.navButton} onPress={onPress} accessible accessibilityLabel={`Navigate to ${name}`}>
      <Icon name={name} size={size} color={isActive ? '#577CEF' : '#C7C6C5'} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.navbar}>
      <NavButton name="home-outline" onPress={() => setCurrentScreen('Home')} isActive={currentScreen === 'Home'} size={ICON_SIZE} />
      <NavButton name="chatbox-outline" onPress={() => setCurrentScreen('Messages')} isActive={currentScreen === 'Messages'} size={ICON_SIZE} />
      <View style={styles.scanContainer}>
        <View style={styles.circle} />
        <TouchableOpacity style={styles.scanButton} onPress={() => setCurrentScreen('Scan')}>
          <Icon name="scan-outline" size={SCAN_ICON_SIZE} color="#000000" />
        </TouchableOpacity>
      </View>
      <NavButton name="settings-outline" onPress={() => setCurrentScreen('Settings')} isActive={currentScreen === 'Settings'} size={ICON_SIZE} />
      <NavButton name="person-outline" onPress={() => setCurrentScreen('Profile')} isActive={currentScreen === 'Profile'} size={ICON_SIZE} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#C7C6C5',
  },
  navButton: {
    alignItems: 'center',
  },
  scanContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#577CEF',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25, // Adjusted marginTop value
    elevation: 5,
    top:-15,
  },
});

export default Navbar;