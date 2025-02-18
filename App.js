import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons"; 
import HomePage from './HomePage';
import MealPlanPage from './MealPlanPage';
import SearchPage from './SearchPage';
import NutrientsPage from './NutrientsPage';
import SettingsPage from './SettingsPage';
import GroceryList from './GroceryList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <NavigationContainer>
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
      </NavigationContainer>
    );
  }





// const Stack = createStackNavigator();

// export default function App(){
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName="Home">
//                 <Stack.Screen name = "Home" component={HomePage} />
//                 <Stack.Screen name = "MealPlan" component={MealPlanPage} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }