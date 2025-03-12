import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import * as Font from "expo-font";

export default function WelcomePage({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Load the fancy font
    Font.loadAsync({
      "PlayfairDisplay-Bold": require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Welcome Message */}
      <Text style={styles.title}>Welcome to AI Meal Planner</Text>
      <Text style={styles.subtitle}>Your smart assistant for healthy eating</Text>

      {/* Login Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Login")}
        activeOpacity={0.7}
      >
        <Ionicons name="log-in-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign-Up Button */}
      <TouchableOpacity 
        style={[styles.button, styles.signUpButton]} 
        onPress={() => navigation.navigate("SignUp")}
        activeOpacity={0.7}
      >
        <Ionicons name="person-add-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E5", // Soft warm background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "PlayfairDisplay-Bold", // Fancy Font
  },
  subtitle: {
    fontSize: 18,
    color: "#7D5A50",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2", // Soft blue
    padding: 15,
    width: "80%",
    borderRadius: 12,
    justifyContent: "center",
    marginVertical: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    transform: [{ scale: 1 }],
  },
  signUpButton: {
    backgroundColor: "#6FCF97", // Soft green
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
