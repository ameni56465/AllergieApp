import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LastReactionScreen = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [reactionData, setReactionData] = useState([]);
  const [formData, setFormData] = useState({
    reactionType: '',
    date: '',
  });

  const [showCalendar, setShowCalendar] = useState(false); // Contrôler la visibilité du calendrier

  const handleAddButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (formData.reactionType && formData.date) {
      setReactionData([...reactionData, formData]);
      setFormData({ reactionType: '', date: '' });
      setShowForm(false);
    } else {
      alert('Veuillez remplir tous les champs avant de soumettre');
    }
  };

  const handleDelete = (index) => {
    const updatedData = reactionData.filter((_, i) => i !== index);
    setReactionData(updatedData);
  };

  const handleUpdate = (index) => {
    const reactionToEdit = reactionData[index];
    setFormData(reactionToEdit); // Pré-remplir le formulaire avec les données à éditer
    setShowForm(true); // Afficher le formulaire
    setReactionData(reactionData.filter((_, i) => i !== index)); // Retirer l'entrée pour éviter les doublons
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
        <Text style={styles.title}>Last Reaction</Text>

        {reactionData.length === 0 && (
          <Text style={styles.subtitle}>Add your last reaction details</Text>
        )}

        {/* Affichage des données de réaction dans un format de tableau */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Reaction Type</Text>
            <Text style={styles.tableHeaderText}>Date</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
          <ScrollView style={styles.tableBody}>
            {reactionData.map((data, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.reactionType}</Text>
                <Text style={styles.tableCell}>{data.date}</Text>
                <View style={styles.tableActions}>
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
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Enter Reaction Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Reaction Type"
              value={formData.reactionType}
              onChangeText={(text) => handleInputChange('reactionType', text)}
            />

            {/* Calendrier Modal en remplacement de la description */}
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={handleCalendarClick} // Ouvrir le calendrier
            >
              <Text style={styles.calendarButtonText}>
                {formData.date ? `Selected Date: ${formData.date}` : 'Select a Date'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showForm && (
          <TouchableOpacity
            style={styles.addButtonClick}
            onPress={handleAddButtonClick}
          >
            <Ionicons name="add" size={50} color="white" />
          </TouchableOpacity>
        )}

        {/* Bouton pour naviguer vers la page suivante */}
        <TouchableOpacity
          style={styles.nextPageButton}
          onPress={() => navigation.navigate('NextPage')} // Naviguer vers la page suivante
        >
          <Text style={styles.nextPageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Calendrier Modal */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 70,
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
    marginTop: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#577CEF',
    marginLeft: 100,
    top: 10,
  },
  subtitle: {
    fontSize: 22,
    color: '#577CEF',
    marginLeft: 70,
    top: 20,
  },
  table: {
    marginTop: 35,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    top: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#577CEF',
    padding: 10,
  },
  tableHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  tableBody: {
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  tableActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  iconDelete: {
    marginRight: 10,
  },
  iconEdit: {
    marginLeft: 10,
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#292EA9',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  calendarButton: {
    padding: 10,
    backgroundColor: '#292EA9',
    borderRadius: 5,
    marginBottom: 10,
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButtonClick: {
    backgroundColor: '#577CEF',
    borderRadius: 40,  // Adjusted to ensure the circle is well-rounded
    padding: 10,  // Optional, adjusts the inner content space
    alignItems: 'center',
    justifyContent: 'center',  // Ensures content is centered inside the circle
    position: 'absolute',  // Positioning it absolutely
    bottom: 20,  // Position it at the bottom of the container
    right: 300,  // Align it to the right side
    width: 80,  // Width and height should be equal for a circle
    height: 80,  // Height matches the width to maintain a circular shape
    top: 710,
  },

  nextPageButton: {
    backgroundColor: '#577CEF',
    paddingVertical: 10,
    paddingHorizontal: 30,  // Adjusted padding (positive value)
    borderRadius: 5,
    position: 'absolute',  // Positioning it absolutely
    bottom: 20,  // Position it at the bottom of the container
    left: 280,  // Adjust horizontal positioning as necessary
    width: 100,  // Example width
    height: 50,  // Example height
    alignItems: 'center',
    justifyContent: 'center',
    top: 730,
  },
  nextPageButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292EA9',
    marginBottom: 10,
  },
  calendarCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarCellText: {
    fontSize: 16,
    color: '#292EA9',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#292EA9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LastReactionScreen;