import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyAlertScreen = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const [formData, setFormData] = useState({
    alertType: '',
    date: '',
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (formData.alertType && formData.date) {
      setAlertData([...alertData, formData]);
      setFormData({ alertType: '', date: '' });
      setShowForm(false);
    } else {
      alert('Please fill all required fields before submitting');
    }
  };

  const handleDelete = (index) => {
    const updatedData = alertData.filter((_, i) => i !== index);
    setAlertData(updatedData);
  };

  const handleUpdate = (index) => {
    const alertToEdit = alertData[index];
    setFormData(alertToEdit);
    setShowForm(true);
    setAlertData(alertData.filter((_, i) => i !== index));
  };

  const handleBackButton = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleNextPageButton = () => {
    if (navigation) {
      navigation.navigate('NextPage');
    }
  };

  const handleCalendarClick = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (date) => {
    setFormData({ ...formData, date });
    setShowCalendar(false);
  };

  const handleDropdownSelect = (option) => {
    setFormData({ ...formData, alertType: option });
    setDropdownOpen(false);
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
        <Text style={styles.title}>Emergency Alert</Text>

        {alertData.length === 0 && (
          <Text style={styles.subtitle}>Add your emergency alert details</Text>
        )}

        <ScrollView style={styles.dataList}>
          <TableHeader />
          <FlatList
            data={alertData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.alertType}</Text>
                <Text style={styles.tableCell}>{item.date}</Text>
                <TouchableOpacity
                  style={styles.iconDelete}
                  onPress={() => handleDelete(index)}
                >
                  <Ionicons name="trash-outline" size={24} color="#FF4C4C" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconEdit}
                  onPress={() => handleUpdate(index)}
                >
                  <Ionicons name="create-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>

        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Enter Emergency Alert Details</Text>

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
                placeholder="Alert Type"
                value={formData.alertType}
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
                  {['Fire', 'Medical', 'Natural Disaster'].map((option) => (
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
      </View>

      {/* Next Page Button as text */}
      <TouchableOpacity style={styles.nextPageButton} onPress={handleNextPageButton}>
        <Text style={styles.nextPageButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderCell}>Alert Type</Text>
    <Text style={styles.tableHeaderCell}>Date</Text>
    <Text style={styles.tableHeaderCell}>Actions</Text>
  </View>
);

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
  nextPageButton: {
    backgroundColor: '#577CEF',
    paddingVertical: 10,
    paddingHorizontal: 30, 
    borderRadius: 5,
    position: 'absolute', 
    bottom: 20,  
    left: 290,  
    width: 100,  
    height: 50,  
    alignItems: 'center',
    justifyContent: 'center',
    top:800,
  },
  nextPageButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#577CEF',
    marginLeft:100,
    top:30,
  },
  subtitle: {
    fontSize: 22,
    color: '#577CEF',
    marginLeft:50,
    top:40,
  },
  dataList: {
    marginTop: 35,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    top:20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#577CEF',
    padding: 10,
  },
  tableHeaderCell: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  iconDelete: {
    marginRight: 10,
  },
  iconEdit: {
    marginLeft: 10,
  },
  formContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  calendarIcon: {
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  dropdownOptions: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    zIndex: 10,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#577CEF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addButtonClick: {
    backgroundColor: '#577CEF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 300,
    elevation: 5,
    top:740,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  calendarCell: {
    width: '12%',
    padding: 10,
    margin: 3,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    alignItems: 'center',
  },
  calendarCellText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#577CEF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EmergencyAlertScreen;