import React from "react";
import { View, Button } from "react-native";
import { auth, signOut } from "firebase/auth";

export default function SettingsPage({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Welcome");
  };

  return (
    <View>
      <Button title="View Profile" onPress={() => navigation.navigate("UserProfile")} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
