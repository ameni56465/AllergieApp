import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SymptomScreen = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [symptomData, setSymptomData] = useState([]);
  const [formData, setFormData] = useState({
    dropdown: '',
    date: '',
    symptom: '', // Nouveau champ pour le symptôme
  });

  const [showCalendar, setShowCalendar] = useState(false); // Contrôle l'affichage du calendrier
  const [dropdownOpen, setDropdownOpen] = useState(false); // Gère l'affichage du dropdown

  const handleAddButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (formData.dropdown && formData.date && formData.symptom) {
      setSymptomData([...symptomData, formData]);
      setFormData({ dropdown: '', date: '', symptom: '' });
      setShowForm(false);
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
    setSymptomData(symptomData.filter((_, i) => i !== index)); // Supprimer l'entrée pour éviter les doublons
  };

  const handleBackButton = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleCalendarClick = () => {
    setShowCalendar(true); // Afficher le calendrier
  };

  const handleDateSelect = (date) => {
    setFormData({ ...formData, date });
    setShowCalendar(false); // Fermer le calendrier après la sélection
  };

  const handleDropdownSelect = (option) => {
    setFormData({ ...formData, dropdown: option });
    setDropdownOpen(false); // Fermer le dropdown après sélection
  };

  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    return (
      <FlatList
        data={days}
        numColumns={7}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.calendarCell}
            onPress={() => handleDateSelect(`${today.getFullYear()}-${today.getMonth() + 1}-${item}`)}
          >
            <Text style={styles.calendarCellText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toString()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <View style={styles.backCircle}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.title}>Health Status</Text>

        {symptomData.length === 0 && (
          <Text style={styles.subtitle}>Add your health status information</Text>
        )}

        <ScrollView style={styles.dataList}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Date</Text>
              <Text style={styles.tableHeaderText}>Severity</Text>
              <Text style={styles.tableHeaderText}>Symptom</Text>
              <Text style={styles.tableHeaderText}>Actions</Text>
            </View>
            {symptomData.map((data, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.date}</Text>
                <Text style={styles.tableCell}>{data.dropdown}</Text>
                <Text style={styles.tableCell}>{data.symptom}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => handleUpdate(index)}>
                    <Ionicons name="pencil" size={18} color="#007BFF" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Ionicons name="trash-bin" size={18} color="#FF0000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Enter Health Status Details</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={formData.date}
                editable={false}
              />
              <TouchableOpacity
                style={styles.calendarIcon}
                onPress={handleCalendarClick}
              >
                <Ionicons name="calendar-outline" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <View style={styles.dropdownContainer}>
              <TextInput
                style={styles.input}
                placeholder="Dropdown"
                value={formData.dropdown}
                editable={false}
              />
              <TouchableOpacity
                style={styles.dropdownIcon}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Ionicons name="chevron-down-outline" size={24} color="gray" />
              </TouchableOpacity>
              {dropdownOpen && (
                <View style={styles.dropdownOptions}>
                  {['Mild', 'Moderate', 'Severe'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownOption}
                      onPress={() => handleDropdownSelect(option)}
                    >
                      <Text style={styles.dropdownOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Symptom"
                value={formData.symptom}
                onChangeText={(text) => handleInputChange('symptom', text)}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {showCalendar && (
          <Modal
            transparent={true}
            visible={showCalendar}
            animationType="slide"
            onRequestClose={() => setShowCalendar(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.calendarContainer}>
                <Text style={styles.calendarTitle}>Select a Date</Text>
                {renderCalendar()}
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowCalendar(false)}
                >
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {!showForm && (
          <TouchableOpacity
            style={styles.addButtonClick}
            onPress={handleAddButtonClick}
          >
            <Ionicons name="add" size={50} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => alert('Next button clicked!')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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
    top: 40,
    left: 20,
  },
  backCircle: {
    backgroundColor: '#577CEF',
    borderRadius: 25,
    padding: 10,
  },
  section: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#577CEF',
    top: -50,
    marginLeft: 130,
  },
  subtitle: {
    fontSize: 22,
    color: '#577CEF',
    marginLeft: 50,
    top: -20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#577CEF',
    padding: 10,
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    width: '25%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
    width: '25%',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '25%',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#577CEF',
    paddingVertical: 8,
    paddingHorizontal: 20,  // Reduced padding for smaller button size
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 300,
    width: 80,  // Smaller width for button
    height: 40,  // Smaller height for button
    alignItems: 'center',
    justifyContent: 'center',
    top: 710,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  calendarCell: {
    width: '14%',
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  calendarCellText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#577CEF',
    borderRadius: 5,
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonClick: {
    backgroundColor: '#577CEF',
    borderRadius: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 300,
    width: 70,
    height: 70,
    top: 690,
  },
});

export default SymptomScreen;
