import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons"; 
import HomePage from './HomePage';
import MealPlanPage from './MealPlanPage';
import SearchPage from './SearchPage';
import NutrientsPage from './NutrientsPage';
import SettingsPage from './SettingsPage';
import GroceryList from './GroceryList';
import FoodDetailPage from './FoodDetails';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import UserProfile from './UserProfile'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator (Main App Navigation)
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Meal Plan") iconName = "restaurant";
          else if (route.name === "Nutrients") iconName = "list";
          else if (route.name === "Grocery List") iconName = "book";
          else if (route.name === "Search") iconName = "search-outline";
          else if (route.name === "Settings") iconName = "settings";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Meal Plan" component={MealPlanPage} />
      <Tab.Screen name="Nutrients" component={NutrientsPage} />
      <Tab.Screen name="Grocery List" component={GroceryList} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="FoodDetail" component={FoodDetailPage} />
            <Stack.Screen name="UserProfile" component={UserProfile} /> 
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
