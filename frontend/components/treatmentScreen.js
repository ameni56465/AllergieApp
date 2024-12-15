import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 

const TreatmentScreen = ({ navigation }) => { 
  const [showForm, setShowForm] = useState(false); 
  const [treatmentData, setTreatmentData] = useState([]); 
  const [formData, setFormData] = useState({ 
    currentAllergenMedication: '', 
    takenSince: '', 
    otherDiseases: '', 
    otherMedication: '', 
    treatment: '', 
  }); 

  const [formSubmitted, setFormSubmitted] = useState(false); 

  const handleAddButtonClick = () => { 
    setShowForm(!showForm); 
  }; 

  const handleInputChange = (field, value) => { 
    setFormData({ ...formData, [field]: value }); 
  }; 

  const handleSubmit = () => { 
    if (formData.currentAllergenMedication && formData.takenSince && formData.otherDiseases && formData.otherMedication) { 
      setTreatmentData([...treatmentData, formData]); 
      setFormData({ currentAllergenMedication: '', takenSince: '', otherDiseases: '', otherMedication: '', treatment: '' }); 
      setShowForm(false); 
      setFormSubmitted(true); 
    } else { 
      alert('Please fill all required fields before submitting'); 
    } 
  }; 

  const handleDelete = (index) => { 
    const updatedData = treatmentData.filter((_, i) => i !== index); 
    setTreatmentData(updatedData); 
  }; 

  const handleUpdate = (index) => { 
    const dataToEdit = treatmentData[index]; 
    setFormData(dataToEdit); 
    setShowForm(true); 
    setTreatmentData(treatmentData.filter((_, i) => i !== index)); 
  }; 

  const handleBackButton = () => { 
    if (navigation) { 
      navigation.goBack(); 
    } 
  }; 

  return ( 
    <View style={styles.container}> 
      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}> 
        <View style={styles.backCircle}> 
          <Ionicons name="arrow-back" size={24} color="white" /> 
        </View> 
      </TouchableOpacity> 

      <View style={styles.section}> 
        <Text style={styles.title}>Treatment & Medications</Text>

        {formSubmitted && (
          <>
            <Image 
              source={require('./assets/download.png')} 
              style={styles.image1} 
            />
            <Image 
              source={require('./assets/download1.png')} 
              style={styles.image2} 
            />
            <Image 
              source={require('./assets/download3.png')}
              style={styles.image3} 
            />
          </>
        )}

        {treatmentData.length === 0 && ( 
          <Text style={styles.subtitle}>Add your treatment information</Text> 
        )}

        <ScrollView style={styles.dataList}> 
          {treatmentData.map((data, index) => ( 
            <View key={index} style={styles.dataContainer}> 
              <TouchableOpacity 
                style={styles.iconDelete} 
                onPress={() => handleDelete(index)} 
              > 
                <Ionicons name="trash-outline" size={24} color="white" /> 
              </TouchableOpacity> 
              <TouchableOpacity 
                style={styles.iconEdit} 
                onPress={() => handleUpdate(index)} 
              > 
                <Ionicons name="create-outline" size={24} color="white" /> 
              </TouchableOpacity> 
              <View style={styles.infoBox}> 
                <Text style={styles.dataText}> 
                  <Text style={styles.titleLabel}>Current Allergen Medication:</Text> {data.currentAllergenMedication} 
                </Text> 
                <Text style={styles.dataText}> 
                  <Text style={styles.titleLabel}>Taken Since:</Text> {data.takenSince} 
                </Text> 
                <Text style={styles.dataText}> 
                  <Text style={styles.titleLabel}>Other Diseases:</Text> {data.otherDiseases} 
                </Text> 
                <Text style={styles.dataText}> 
                  <Text style={styles.titleLabel}>Other Medication:</Text> {data.otherMedication} 
                </Text> 
                {data.treatment && ( 
                  <Text style={styles.dataText}> 
                    <Text style={styles.titleLabel}>Treatment:</Text> {data.treatment} 
                  </Text> 
                )} 
              </View> 
            </View> 
          ))} 
        </ScrollView> 

        {showForm && ( 
          <View style={styles.formContainer}> 
            <Text style={styles.formTitle}>Enter Treatment Details</Text> 
            <TextInput 
              style={styles.input} 
              placeholder="Current Allergen Medication" 
              value={formData.currentAllergenMedication} 
              onChangeText={(text) => handleInputChange('currentAllergenMedication', text)} 
            /> 
            <TextInput 
              style={styles.input} 
              placeholder="Taken Since" 
              value={formData.takenSince} 
              onChangeText={(text) => handleInputChange('takenSince', text)} 
            /> 
            <TextInput 
              style={styles.input} 
              placeholder="Other Diseases" 
              value={formData.otherDiseases} 
              onChangeText={(text) => handleInputChange('otherDiseases', text)} 
            /> 
            <TextInput 
              style={styles.input} 
              placeholder="Other Medication" 
              value={formData.otherMedication} 
              onChangeText={(text) => handleInputChange('otherMedication', text)} 
            /> 
            <TextInput 
              style={styles.input} 
              placeholder="Treatment (Optional)" 
              value={formData.treatment} 
              onChangeText={(text) => handleInputChange('treatment', text)} 
            /> 
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}> 
              <Text style={styles.submitButtonText}>Submit</Text> 
            </TouchableOpacity> 
          </View> 
        )}

        {!formSubmitted && !showForm && ( 
          <TouchableOpacity 
            style={styles.addButtonClick} 
            onPress={handleAddButtonClick} 
          > 
            <Ionicons name="add" size={50} color="white" /> 
          </TouchableOpacity> 
        )}

        {formSubmitted && ( 
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddButtonClick} 
          > 
            <Ionicons name="add" size={30} color="white" /> 
          </TouchableOpacity> 
        )} 
      </View> 
    </View> 
  ); 
};

const styles = StyleSheet.create({ 

 
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 75,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#577CEF',
    textAlign: 'center',
    marginBottom: 5,
    marginLeft: 10,
    top: 12,
  },
  subtitle: {
    fontSize: 30,
    color: '#292EA9',
    textAlign: 'center',
    marginBottom: 20,
    top: 120,
  },
  dataList: {
    width: '100%',
    marginTop: 50,
  },
  dataContainer: {
    backgroundColor: '#577CEF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 5, 
    position: 'relative', 
    top: 60,
  },
  infoBox: {
    flex: 1,
    marginTop: 5,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  titleLabel: {
    color: 'white',
    fontWeight: '600',
  },
  iconDelete: {
    position: 'absolute',
    right: 40,
    top: 10,
  },
  iconEdit: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  addButtonClick: {
    position: 'absolute',
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    bottom: 20,
    right: 130,
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 300,
  },
  addButton: {
    position: 'absolute',
    backgroundColor: '#577CEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -25,
    zIndex: 10,
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 30,
    top: 4,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 5,
    marginBottom: 20,
    top: -250,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#577CEF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  
  image1: {
  
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: 10,
    left: -40,
    top: 430,

    
  },
  image2: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 250,
    right: 10,
    left : 320,
    
  },
  image3: {
     width: 80,
    height: 80,
    position: 'absolute',
    top: 50,
    left: -20,


  },
});

export default TreatmentScreen;


