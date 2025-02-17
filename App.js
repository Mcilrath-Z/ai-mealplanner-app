import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import MealPlanPage from './MealPlanPage';

const Stack = createStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name = "Home" component={HomePage} />
                <Stack.Screen name = "MealPlan" component={MealPlanPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}