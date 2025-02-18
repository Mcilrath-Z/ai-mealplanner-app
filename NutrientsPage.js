import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NutrientsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Nutrients Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NutrientsPage;