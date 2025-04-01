import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Stores user profile data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        bodyStats: {
          weight: 70,  // These are just my default values that user will update later
          height: 170,
          age: 30,
          gender: "Male",
          goal: "Maintain Weight"
        },
        mealHistory: [],
        preferences: { dietType: "None" }
      });

      Alert.alert("Account created successfully!");
    } catch (error) {
      Alert.alert("Error signing up", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>Sign Up</Text>
      
      <TextInput 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
      />
      <TextInput 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
      />
      <TextInput 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }} 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        secureTextEntry
      />
      
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}
