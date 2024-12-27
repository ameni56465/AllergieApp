import React, { useEffect, useState } from 'react'; 
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation(); 
  const route = useRoute(); // Access the current route
  const [currentScreen, setCurrentScreen] = useState(route.name); // Set the initial screen dynamically

  const ICON_SIZE = 30;
  const SCAN_ICON_SIZE = 40;

  useEffect(() => {
    // Update the `currentScreen` when the route changes
    setCurrentScreen(route.name);
  }, [route.name]);

  const handleNavigation = (screen) => {
    navigation.navigate(screen); // Navigate to the selected screen
  };

  const NavButton = ({ name, onPress, isActive, size }) => (
    <TouchableOpacity
      style={styles.navButton}
      onPress={onPress}
      accessible
      accessibilityLabel={`Navigate to ${name}`}
    >
      <Icon name={name} size={size} color={isActive ? '#577CEF' : '#C7C6C5'} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.navbar}>
      <NavButton
        name="home-outline"
        onPress={() => handleNavigation('Overview')}
        isActive={currentScreen === 'Overview'}
        size={ICON_SIZE}
      />
      <NavButton
        name="chatbox-outline"
        onPress={() => handleNavigation('Article')}
        isActive={currentScreen === 'Article'}
        size={ICON_SIZE}
      />
      <View style={styles.scanContainer}>
        <View style={styles.circle} />
        <TouchableOpacity style={styles.scanButton} onPress={() => handleNavigation('Scancode')}>
          <Icon name="scan-outline" size={SCAN_ICON_SIZE} color="#000000" />
        </TouchableOpacity>
      </View>
      <NavButton
        name="settings-outline"
        onPress={() => handleNavigation('settings')}
        isActive={currentScreen === 'settings'}
        size={ICON_SIZE}
      />
      <NavButton
        name="person-outline"
        onPress={() => handleNavigation('ProfileScreen')}
        isActive={currentScreen === 'ProfileScreen'}
        size={ICON_SIZE}
      />
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
    backgroundColor: '#8aa7de',
    paddingVertical: 5,
    borderTopColor: '#C7C6C5',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
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
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25, // Adjusted marginTop value
    elevation: 5,
    top: -15,
  },
});

export default Navbar;
