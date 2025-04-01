import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function UserProfile({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such user data!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {userData ? (
        <>
          <Text>Email: {userData.email}</Text>
          <Text>Weight: {userData.bodyStats.weight} kg</Text>
          <Text>Height: {userData.bodyStats.height} cm</Text>
          <Text>Age: {userData.bodyStats.age}</Text>
          <Text>Gender: {userData.bodyStats.gender}</Text>
          <Text>Goal: {userData.bodyStats.goal}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
});
