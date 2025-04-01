import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get("window");

export default function WelcomePage({ navigation }) {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Icons */}
      <Ionicons name="nutrition-outline" size={70} color="#AED581" style={[styles.icon, { top: 50, left: 20 }]} />
      <Ionicons name="restaurant-outline" size={65} color="#B0BEC5" style={[styles.icon, { top: 120, right: 30 }]} />
      <Ionicons name="heart-outline" size={55} color="#81C784" style={[styles.icon, { bottom: 200, left: 60 }]} />
      <Ionicons name="water-outline" size={80} color="#64B5F6" style={[styles.icon, { bottom: 60, right: 50 }]} />
      <Ionicons name="cafe-outline" size={60} color="#FF8A65" style={[styles.icon, { top: 180, left: 80 }]} />
      <Ionicons name="nutrition-outline" size={50} color="#E57373" style={[styles.icon, { bottom: 160, right: 70 }]} />

      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Poppins_700Bold" }]}>Welcome to</Text>
      <Text style={[styles.title, { color: '#4A90E2', fontFamily: "Poppins_700Bold" }]}>AI Meal Planner</Text>

      <Text style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}>Your Smart Companion for Healthier Meals 🍽️</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Ionicons name="log-in-outline" size={20} color="white" style={styles.buttonIcon} />
        <Text style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate("SignUp")}>
        <Ionicons name="person-add-outline" size={20} color="white" style={styles.buttonIcon} />
        <Text style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#FFF9F0',
  },
  title: {
    fontSize: 32,
    color: "#5D4037",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7D5A50",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 15,
    width: "80%",
    borderRadius: 12,
    justifyContent: "center",
    marginVertical: 8,
    elevation: 2,
  },
  signUpButton: {
    backgroundColor: "#6FCF97",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  buttonIcon: {
    marginRight: 8,
  },
  icon: {
    position: "absolute",
    opacity: 0.6,
  },
});
