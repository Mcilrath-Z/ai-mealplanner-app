import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "./firebaseConfig"; 
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { ActivityIndicator } from "react-native";

export default function HomePage() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  // Form States
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('Male');
  const [goal, setGoal] = useState('Maintain Weight');
  const [activity, setActivity] = useState('Moderately Active');
  const [dietPreference, setDietPreference] = useState('None');
  const [dislikedFoods, setDislikedFoods] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');

  // Load fonts
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.bodyStats) {
          setWeight(userData.bodyStats.weight);
          setHeight(userData.bodyStats.height);
          setAge(userData.bodyStats.age);
          setGender(userData.bodyStats.gender);
          setGoal(userData.bodyStats.goal);
        }
      }
    };

    fetchUserStats();
  }, []);

  const saveBodyStats = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      bodyStats: {
        weight: Number(weight),
        height: Number(height),
        age: Number(age),
        gender,
        goal,
      },
    });

    Alert.alert("Saved", "Your stats have been updated!");
  };

  const options = {
    gender: ["Male", "Female", "Other"],
    goal: ["Lose Weight", "Maintain Weight", "Gain Weight"],
    activity: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"],
    dietPreference: ["None", "Vegan", "Vegetarian", "Keto", "Paleo", "Carnivore", "Pescatarian"],
  };

  const openModal = (key) => {
    setModalData({ key, options: options[key] });
    setShowModal(true);
  };

  const handleSelection = (value) => {
    switch (modalData.key) {
      case 'gender': setGender(value); break;
      case 'goal': setGoal(value); break;
      case 'activity': setActivity(value); break;
      case 'dietPreference': setDietPreference(value); break;
    }
    setShowModal(false);
  };

  if (!fontsLoaded) return <ActivityIndicator size="large" color="#4A90E2" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { fontFamily: "Poppins_700Bold" }]}>Generate Your Meal Plan</Text>

        {/* Sliders */}
        <Text style={styles.label}>Weight (kg): {weight}</Text>
        <Slider style={styles.slider} minimumValue={40} maximumValue={150} step={1} value={weight} onValueChange={setWeight} />

        <Text style={styles.label}>Height (cm): {height}</Text>
        <Slider style={styles.slider} minimumValue={140} maximumValue={220} step={1} value={height} onValueChange={setHeight} />

        <Text style={styles.label}>Age: {age}</Text>
        <Slider style={styles.slider} minimumValue={10} maximumValue={100} step={1} value={age} onValueChange={setAge} />

        {/* Dropdown-like buttons */}
          {[
              { key: 'gender', value: gender },
              { key: 'goal', value: goal },
              { key: 'activity', value: activity },
              { key: 'dietPreference', value: dietPreference }
            ].map(item => (
              <View key={item.key}>
                <Text style={styles.label}>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}:</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => openModal(item.key)}>
                  <Text style={{ fontFamily: "Poppins_400Regular" }}>{item.value}</Text>
                </TouchableOpacity>
              </View>
          ))}

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={saveBodyStats}>
          <Text style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}>Save Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('MealPlan')}>
          <Text style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}>Generate Meal Plan</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
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
            <TouchableOpacity onPress={() => setShowModal(false)} style={[styles.button, styles.closeButton]}>
              <Text style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF9F0' },
  scrollContainer: { paddingBottom: 30 },
  title: { fontSize: 28, color: "#4A90E2", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 14, marginTop: 10, marginBottom: 5, color: "#555" },
  slider: { width: '100%', height: 40 },
  dropdown: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, backgroundColor: '#fff', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, backgroundColor: '#fff', marginBottom: 10 },
  button: { backgroundColor: "#4A90E2", padding: 15, borderRadius: 12, marginTop: 10, alignItems: "center" },
  secondaryButton: { backgroundColor: "#6FCF97" },
  buttonText: { color: "white", fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 },
  modalItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  closeButton: { backgroundColor: "#FF8A65", marginTop: 10 }
});
