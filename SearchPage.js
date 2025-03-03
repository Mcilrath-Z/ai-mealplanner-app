import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persisting data
import foodData from "./assets/foodData.json"; // Ensure correct path

const SearchPage = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);

  // Load selected meals from AsyncStorage
  useEffect(() => {
    const loadMeals = async () => {
      const storedMeals = await AsyncStorage.getItem("selectedMeals");
      if (storedMeals) {
        setSelectedMeals(JSON.parse(storedMeals));
      }
    };
    loadMeals();
  }, []);

  // Filter meals based on search input
  const filteredMeals = foodData.filter(meal =>
    meal.food && meal.food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add a meal to the selected list
  const addMealToLog = async (meal) => {
    try {
      const storedMeals = await AsyncStorage.getItem("selectedMeals");
      let updatedMeals = storedMeals ? JSON.parse(storedMeals) : [];
  
      // Check if meal is already added (avoid duplicates)
      if (!updatedMeals.find(m => m.food === meal.food)) {
        updatedMeals.push(meal); // Add new meal
        await AsyncStorage.setItem("selectedMeals", JSON.stringify(updatedMeals)); // Save updated list
        Alert.alert("Added", `${meal.food} has been added!`);
      } else {
        Alert.alert("Already Added", `${meal.food} is already in the log.`);
      }
    } catch (error) {
      console.error("Error adding meal: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Meals</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for meals..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredMeals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text>{item.food} - {item["Caloric Value"]} kcal</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addMealToLog(item)}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20 },
  mealItem: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: "#ccc" 
  },
  addButton: { 
    backgroundColor: "#4CAF50", 
    padding: 10, 
    borderRadius: 5 
  },
  addText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default SearchPage;
