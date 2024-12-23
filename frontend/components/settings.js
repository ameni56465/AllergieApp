import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          {/* Cercle derrière le bouton */}
          <View style={styles.circle}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.header}>Settings</Text>
      </View>

      {/* Contenu défilable */}
      <ScrollView style={styles.scrollContainer}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.frame}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.itemText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="shield-outline" size={24} color="black" />
            <Text style={styles.itemText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.itemText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text style={styles.itemText}>Privacy</Text>
          </TouchableOpacity>
        </View>

        {/* Cache & Cellular Section */}
        <Text style={styles.sectionTitle}>Cache & Cellular</Text>
        <View style={styles.frame}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text style={styles.itemText}>Free up space</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="timer-outline" size={24} color="black" />
            <Text style={styles.itemText}>Data Saver</Text>
          </TouchableOpacity>
        </View>

        {/* Actions Section */}
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.frame}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="flag-outline" size={24} color="black" />
            <Text style={styles.itemText}>Report a problem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="add-outline" size={24} color="black" />
            <Text style={styles.itemText}>Add account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="log-out-outline" size={24} color="black" />
            <Text style={styles.itemText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#EDEDED',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    marginLeft: -160,
    marginTop: 4,
  },
  circle: {
    backgroundColor: '#577CEF', 
    width: 35, 
    height: 35, 
    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center',
   
  
  },
  backButton: {
    padding: 4,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#577CEF',
    marginLeft: 70,
  },
  scrollContainer: {
    marginTop: 80,
    padding: 20,
  },
  frame: {
    backgroundColor: '#DFDDDB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#DFDDDB',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 3,
    top :10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    top: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  itemText: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default SettingsScreen;
