import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FoodDetailPage = ({ route }) => {
    // Gets selected food data from navigation parameters
    const { food } = route.params;
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{food.food}</Text>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Macronutrients</Text>
          <Text>Calories: {food["Caloric Value"]} kcal</Text>
          <Text>Protein: {food.Protein}g</Text>
          <Text>Carbohydrates: {food.Carbohydrates}g</Text>
          <Text>Fats: {food.Fat}g</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Micronutrients</Text>
          <Text>Vitamin A: {food["Vitamin A"]} mg</Text>
          <Text>Vitamin B1 (Thiamine): {food["Vitamin B1"]} mg</Text>
          <Text>Vitamin B2 (Riboflavin): {food["Vitamin B2"]} mg</Text>
          <Text>Vitamin B3 (Niacin): {food["Vitamin B3"]} mg</Text>
          <Text>Vitamin B5 (Pantothenic Acid): {food["Vitamin B5"]} mg</Text>
          <Text>Vitamin B6: {food["Vitamin B6"]} mg</Text>
          <Text>Vitamin B12: {food["Vitamin B12"]} mcg</Text>
          <Text>Vitamin C: {food["Vitamin C"]} mg</Text>
          <Text>Vitamin D: {food["Vitamin D"]} mg</Text>
          <Text>Vitamin E: {food["Vitamin E"]} mg</Text>
          <Text>Vitamin K: {food["Vitamin K"]} mg</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minerals</Text>
          <Text>Calcium: {food.Calcium} mg</Text>
          <Text>Iron: {food.Iron} mg</Text>
          <Text>Magnesium: {food.Magnesium} mg</Text>
          <Text>Phosphorus: {food.Phosphorus} mg</Text>
          <Text>Potassium: {food.Potassium} mg</Text>
          <Text>Sodium: {food.Sodium} mg</Text>
          <Text>Zinc: {food.Zinc} mg</Text>
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    section: { marginBottom: 20, padding: 15, backgroundColor: "#ffffff", borderRadius: 8 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  });
  
  export default FoodDetailPage;