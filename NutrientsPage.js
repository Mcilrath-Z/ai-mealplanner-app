import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; 

const NutrientsPage = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });

  // Load selected meals when navigating to the page
  useFocusEffect(
    React.useCallback(() => {
      const loadMeals = async () => {
        const storedMeals = await AsyncStorage.getItem("selectedMeals");
        if (storedMeals) {
          const parsedMeals = JSON.parse(storedMeals);
          setSelectedMeals(parsedMeals);
          calculateTotals(parsedMeals);
        }
      };
      loadMeals();
    }, [])
  );

  const calculateTotals = (meals) => {
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;
  
    meals.forEach(meal => {
      totalCalories += meal["Caloric Value"] || 0;
      totalProtein += meal.Protein || 0;
      totalCarbs += meal.Carbohydrates || 0;
      totalFats += meal.Fat || 0;
    });
  
    // Round values to the nearest whole number
    setTotals({
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats)
    });
  };

  // Remove a meal from the list and update AsyncStorage
  const removeMeal = async (mealToRemove) => {
    const updatedMeals = selectedMeals.filter(meal => meal.food !== mealToRemove.food);
    setSelectedMeals(updatedMeals);
    await AsyncStorage.setItem("selectedMeals", JSON.stringify(updatedMeals)); // Save updated list
    calculateTotals(updatedMeals);
  };

  return (
    <View style={styles.container}>
      {/* Static Header for Nutrient Totals */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Calories: {totals.calories} kcal</Text>
        <Text style={styles.headerText}>Protein: {totals.protein}g</Text>
        <Text style={styles.headerText}>Carbs: {totals.carbs}g</Text>
        <Text style={styles.headerText}>Fats: {totals.fats}g</Text>
      </View>

      <FlatList
        data={selectedMeals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text>{item.food} - {item["Caloric Value"]} kcal</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeMeal(item)}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { 
    backgroundColor: "#f8f9fa", 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 5, 
    alignItems: "center" 
  },
  headerText: { fontSize: 16, fontWeight: "bold" },
  mealItem: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: "#ccc" 
  },
  removeButton: { 
    backgroundColor: "#ff4444", 
    padding: 10, 
    borderRadius: 5 
  },
  removeText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default NutrientsPage;
