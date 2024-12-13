import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SymptomScreen = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [symptomData, setSymptomData] = useState([]);
  const [formData, setFormData] = useState({
    symptomType: '',
    severityLevel: '',
    frequency: '',
    mainTrigger: '',
    note: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (formData.symptomType && formData.severityLevel && formData.frequency && formData.mainTrigger) {
      setSymptomData([...symptomData, formData]);
      setFormData({ symptomType: '', severityLevel: '', frequency: '', mainTrigger: '', note: '' });
      setShowForm(false);
      setFormSubmitted(true);
    } else {
      alert('Please fill all required fields before submitting');
    }
  };

  const handleDelete = (index) => {
    const updatedData = symptomData.filter((_, i) => i !== index);
    setSymptomData(updatedData);
  };

  const handleUpdate = (index) => {
    const symptomToEdit = symptomData[index];
    setFormData(symptomToEdit); // Pré-remplir le formulaire avec les données à modifier
    setShowForm(true); // Afficher le formulaire
    setSymptomData(symptomData.filter((_, i) => i !== index)); 
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
        <Text style={styles.title}>Symptoms Tracking</Text>

        {symptomData.length === 0 && (
          <Text style={styles.subtitle}>Add your symptoms information</Text>
        )}

        <ScrollView style={styles.dataList}>
          {symptomData.map((data, index) => (
            <View key={index} style={styles.dataContainer}>
              <TouchableOpacity
                style={styles.iconDelete}
                onPress={() => handleDelete(index)}
              >
                <Ionicons name="trash-outline" size={24} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconEdit}
                onPress={() => handleUpdate(index)}
              >
                <Ionicons name="create-outline" size={24} color="#007BFF" />
              </TouchableOpacity>
              <View style={styles.infoBox}>
                <Text style={styles.dataText}>
                  <Text style={styles.titleLabel}>Type:</Text> {data.symptomType}
                </Text>
                <Text style={styles.dataText}>
                  <Text style={styles.titleLabel}>Severity:</Text> {data.severityLevel}
                </Text>
                <Text style={styles.dataText}>
                  <Text style={styles.titleLabel}>Frequency:</Text> {data.frequency}
                </Text>
                <Text style={styles.dataText}>
                  <Text style={styles.titleLabel}>Trigger:</Text> {data.mainTrigger}
                </Text>
                {data.note && (
                  <Text style={styles.dataText}>
                    <Text style={styles.titleLabel}>Note:</Text> {data.note}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Enter Symptom Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Symptom Type"
              value={formData.symptomType}
              onChangeText={(text) => handleInputChange('symptomType', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Severity Level"
              value={formData.severityLevel}
              onChangeText={(text) => handleInputChange('severityLevel', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Frequency"
              value={formData.frequency}
              onChangeText={(text) => handleInputChange('frequency', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Main Trigger"
              value={formData.mainTrigger}
              onChangeText={(text) => handleInputChange('mainTrigger', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Additional Notes (Optional)"
              value={formData.note}
              onChangeText={(text) => handleInputChange('note', text)}
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
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  infoBox: {
    flex: 1,
    margintop: -30,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  titleLabel: {
    color: '#577CEF',
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
});

export default SymptomScreen;

