import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const NutrientsPage = ({ navigation }) => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });

  // Load meals from AsyncStorage when page is opened
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

  // Calculates total calories, proteins, carbs, and fats
  const calculateTotals = (meals) => {
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;

    meals.forEach(meal => {
      totalCalories += meal["Caloric Value"] || 0;
      totalProtein += meal.Protein || 0;
      totalCarbs += meal.Carbohydrates || 0;
      totalFats += meal.Fat || 0;
    });

    setTotals({
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats)
    });
  };

  // Removes a meal from the list
  const removeMeal = async (mealToRemove) => {
    const updatedMeals = selectedMeals.filter(meal => meal.food !== mealToRemove.food);
    setSelectedMeals(updatedMeals);
    await AsyncStorage.setItem("selectedMeals", JSON.stringify(updatedMeals));
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

      {/* List of selected meals */}
      <FlatList
        data={selectedMeals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            {/* Opens FoodDetailsPage when you click on it */}
            <TouchableOpacity onPress={() => navigation.navigate("FoodDetail", { food: item })} style={styles.foodItem}>
              <Text>{item.food} - {item["Caloric Value"]} kcal</Text>
            </TouchableOpacity>
            {/* Button to remove a meal */}
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
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  header: { 
    backgroundColor: "#e3e3e3", 
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
  foodItem: { 
    flex: 1, // Makes the text clickable
  },
  removeButton: { 
    backgroundColor: "#ff4444", 
    padding: 10, 
    borderRadius: 5 
  },
  removeText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default NutrientsPage;
