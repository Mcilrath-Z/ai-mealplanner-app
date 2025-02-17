import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, FlatList, Platform, StatusBar } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('Male');
  const [goal, setGoal] = useState('Maintain Weight');
  const [activity, setActivity] = useState('Moderately Active');
  const [dietPreference, setDietPreference] = useState('None');
  const [dislikedFoods, setDislikedFoods] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const navigation = useNavigation();

  const options = {
    gender: ["Male", "Female", "Other"],
    goal: ["Lose Weight", "Maintain Weight", "Gain Weight"],
    activity: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"],
    dietPreference: ["None", "Vegan", "Vegetarian", "Keto", "Paleo"],
  };

  const openModal = (key) => {
    setModalData({ key, options: options[key] });
    setShowModal(true);
  };

  const handleSelection = (value) => {
    switch (modalData.key) {
      case 'gender':
        setGender(value);
        break;
      case 'goal':
        setGoal(value);
        break;
      case 'activity':
        setActivity(value);
        break;
      case 'dietPreference':
        setDietPreference(value);
        break;
    }
    setShowModal(false);
  };


  const generateMealPlan = () => {
    //navigates to mealplanpage
    navigation.navigate('MealPlan');
  };

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight }]}> {/* Added safe area padding */}
      <Text style={styles.title}>Generate Your Meal Plan</Text>

      {/* Weight Slider */}
      <Text>Weight (kg): {weight}</Text>
      <Slider
        style={styles.slider}
        minimumValue={40}
        maximumValue={150}
        step={1}
        value={weight}
        onValueChange={value => setWeight(value)}
      />

      {/* Height Slider */}
      <Text>Height (cm): {height}</Text>
      <Slider
        style={styles.slider}
        minimumValue={140}
        maximumValue={220}
        step={1}
        value={height}
        onValueChange={value => setHeight(value)}
      />

      {/* Age Slider */}
      <Text>Age: {age}</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={100}
        step={1}
        value={age}
        onValueChange={value => setAge(value)}
      />

      {/* Gender Dropdown Alternative */}
      <Text>Gender:</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => openModal('gender')}>
        <Text>{gender}</Text>
      </TouchableOpacity>

      {/* Weight Goal Dropdown Alternative */}
      <Text>Weight Goal:</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => openModal('goal')}>
        <Text>{goal}</Text>
      </TouchableOpacity>

      {/* Activity Level Dropdown Alternative */}
      <Text>Activity Level:</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => openModal('activity')}>
        <Text>{activity}</Text>
      </TouchableOpacity>

      {/* Dietary Preference Dropdown Alternative */}
      <Text>Dietary Preference:</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => openModal('dietPreference')}>
        <Text>{dietPreference}</Text>
      </TouchableOpacity>

      {/* Disliked Foods Textbox */}
      <Text>Foods You Dislike:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter foods you dislike"
        value={dislikedFoods}
        onChangeText={setDislikedFoods}
      />

      {/* Medical Conditions Textbox */}
      <Text>Medical Conditions:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter any medical conditions"
        value={medicalConditions}
        onChangeText={setMedicalConditions}
      />

      {/* Generate Meal Plan Button */}
      <Button title="Generate Meal Plan" onPress={generateMealPlan} />

      {/* Modal for Dropdown Selection */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={modalData.options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelection(item)} style={styles.modalItem}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
