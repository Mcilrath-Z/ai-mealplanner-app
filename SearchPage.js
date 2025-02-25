import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import foodData from './assets/foodData.json'; // Ensure correct path

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);

  // Filter meals based on search term using 'food' key
  const filteredMeals = foodData.filter(meal =>
    meal.food && meal.food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add meal to daily log
  const addMealToLog = (meal) => {
    setSelectedMeals(prevMeals => [...prevMeals, meal]);
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
          <TouchableOpacity style={styles.mealItem} onPress={() => addMealToLog(item)}>
            <Text>{item.food ? item.food : "Unnamed Food"} - {item["Caloric Value"] ? item["Caloric Value"] : 0} kcal</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20 },
  mealItem: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default SearchPage;
