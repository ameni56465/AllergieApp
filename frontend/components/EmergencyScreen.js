import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyScreen = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [emergencyData, setEmergencyData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    location: '',
    gender: '',
  });
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [positionChanged, setPositionChanged] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(!showForm);
    if (!positionChanged) {
      setPositionChanged(true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.number && formData.location && formData.gender) {
      setEmergencyData([...emergencyData, formData]);
      setFormData({ name: '', number: '', location: '', gender: '' });
      setShowForm(false);
      setFormSubmitted(true);
    } else {
      alert('Please fill all fields before submitting');
    }
  };

  const getDoctorImage = (gender) => {
    return gender === 'male'
      ? require('./assets/male_doctor.png')
      : require('./assets/female_doctor.png');
  };

  const handlePhoneCall = (phoneNumber) => {
    const url = Platform.OS === 'ios' ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      alert('Unable to make a phone call');
    });
  };

  const handleBackButton = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleRemove = (index) => {
    setEmergencyData(emergencyData.filter((_, i) => i !== index)); // Remove by index
  };

  const handleUpdate = (index) => {
    const dataToUpdate = emergencyData[index];
    setFormData(dataToUpdate); // Pre-fill form with data to be updated
    setShowForm(true);
    setEmergencyData(emergencyData.filter((_, i) => i !== index)); // Remove original entry temporarily
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <View style={styles.backCircle}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.title}>Emergency</Text>
        <Text style={styles.subtitle}>Add your emergency</Text>

        <ScrollView style={styles.dataList}>
          {emergencyData.map((data, index) => (
            <View key={index} style={styles.dataContainer}>
              <View style={styles.imageBox}>
                <Image source={getDoctorImage(data.gender)} style={styles.doctorImage} />
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.dataText}>
                  <Text style={styles.label}>Name:</Text> {data.name}
                </Text>
                <Text style={styles.dataText}>
                  <Text style={styles.label}>Number:</Text> {data.number}
                </Text>
                <Text style={styles.dataText}>
                  <Text style={styles.label}>Location:</Text> {data.location}
                </Text>
              </View>
              <TouchableOpacity style={styles.phoneButton} onPress={() => handlePhoneCall(data.number)}>
                <Ionicons name="call" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.threeDotsMenu}>
                <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(index)}>
                  <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(index)}>
                  <Ionicons name="trash-bin-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Enter Emergency Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={formData.number}
              onChangeText={(text) => handleInputChange('number', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              multiline
              value={formData.location}
              onChangeText={(text) => handleInputChange('location', text)}
            />
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.genderSelection}>
              <TouchableOpacity
                style={[styles.genderButton, formData.gender === 'male' && styles.selectedButton]}
                onPress={() => handleInputChange('gender', 'male')}
              >
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, formData.gender === 'female' && styles.selectedButton]}
                onPress={() => handleInputChange('gender', 'female')}
              >
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {!formSubmitted && (
          <TouchableOpacity
            style={[styles.addButton, positionChanged && styles.addButtonClicked]}
            onPress={handleAddButtonClick}
          >
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        )}

        {formSubmitted && (
          <TouchableOpacity
            style={[styles.addButton, positionChanged && styles.addButtonClicked]}
            onPress={handleAddButtonClick}
          >
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#577CEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#577CEF',
    textAlign: 'center',
    marginBottom: 5,
    top: -20,
  },
  subtitle: {
    fontSize: 30,
    color: '#292EA9',
    textAlign: 'center',
    marginBottom: 20,
    top: 90,
  },
  dataList: {
    width: '100%',
    marginTop: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
  },
infoBox: {
  flex: 2,
  paddingLeft: 10,
  fontSize: 50, 
  },
phoneButton: { 
   flex: 0, // Set flex to 0 to avoid stretching
   width: 25, // Adjust width for a smaller button
   height: 25, // Adjust height to match
   borderRadius: 15, // Half of width/height for a perfect circle
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#007BFF', // Adjusted color (you can change this)
   left: 7,
   top: -40,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: '600',
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  addButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    bottom: 20,
    right: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'blue',
    top: 300,
    left: 110,
  },
  addButtonClicked: {
    right: 20,
    backgroundColor: '#577CEF',
    top: -20,
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 215,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    top: -90,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  genderSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  genderButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedButton: {
    backgroundColor: '#577CEF',
  },
  genderText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#577CEF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  threeDotsMenu: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
   flex: 0, // Set flex to 0 to avoid stretching
   width: 25, // Adjust width for a smaller button
   height: 25, // Adjust height to match
   borderRadius: 15, // Half of width/height for a perfect circle
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#4CAF50', 
   top: 70,
   left: 0,
},
  updateButton: {
    flex: 0.5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4D4D',
    top: 30,
    left: 25,
  },
});

export default EmergencyScreen;