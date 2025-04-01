import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import foodData from "./assets/foodData.json";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

const NutrientsPage = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

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

    setTotals({
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats)
    });
  };

  const removeMeal = async (mealToRemove) => {
    const updatedMeals = selectedMeals.filter(meal => meal.food !== mealToRemove.food);
    setSelectedMeals(updatedMeals);
    await AsyncStorage.setItem("selectedMeals", JSON.stringify(updatedMeals));
    calculateTotals(updatedMeals);
  };

  const addMealToLog = async (meal) => {
    const updatedMeals = [...selectedMeals, meal];
    setSelectedMeals(updatedMeals);
    await AsyncStorage.setItem("selectedMeals", JSON.stringify(updatedMeals));
    calculateTotals(updatedMeals);
    Alert.alert("Added", `${meal.food} has been added!`);
  };

  const filteredMeals = foodData.filter(meal =>
    meal.food && meal.food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!fontsLoaded) return <ActivityIndicator size="large" color="#4A90E2" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>Total Calories: {totals.calories} kcal</Text>
        <Text style={styles.headerText}>Protein: {totals.protein}g</Text>
        <Text style={styles.headerText}>Carbs: {totals.carbs}g</Text>
        <Text style={styles.headerText}>Fats: {totals.fats}g</Text>
      </View>

      {/* Toggle Search */}
      <TouchableOpacity style={styles.addButton} onPress={() => setShowSearch(!showSearch)}>
        <Text style={{ color: 'white', fontFamily: "Poppins_700Bold" }}>{showSearch ? "Close Search" : "Add Food"}</Text>
      </TouchableOpacity>

      {/* Search Section */}
      {showSearch && (
        <>
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
              <View style={styles.card}>
                <View>
                  <Text style={styles.foodName}>{item.food}</Text>
                  <Text style={styles.calories}>{item["Caloric Value"]} kcal</Text>
                </View>
                <TouchableOpacity style={styles.addButtonSmall} onPress={() => addMealToLog(item)}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {/* Selected Meals */}
      {!showSearch && (
        <FlatList
          data={selectedMeals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.foodName}>{item.food}</Text>
                <Text style={styles.calories}>{item["Caloric Value"]} kcal</Text>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeMeal(item)}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF9F0" },
  header: { backgroundColor: "#e3e3e3", padding: 15, marginBottom: 10, borderRadius: 5, alignItems: "center" },
  headerText: { fontSize: 16, fontFamily: "Poppins_400Regular" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginVertical: 10, backgroundColor: '#fff' },

  // Personal card styles
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  foodName: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#333",
  },
  calories: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#999",
    marginTop: 4,
  },

  addButton: { backgroundColor: "#4A90E2", padding: 15, borderRadius: 12, marginBottom: 10, alignItems: "center" },

  addButtonSmall: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 8, marginLeft: 10 },

  addButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  removeButton: { backgroundColor: "#ff4444", padding: 10, borderRadius: 8, marginLeft: 10 },

  removeText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default NutrientsPage;
