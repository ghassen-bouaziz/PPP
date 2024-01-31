import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AddCategorie from "../screens/Category/AddCategorie";
import { Pressable, Text } from "react-native";
import { colors } from "../style/colors";
import HeaderCmp from "../components/HeaderCmp";
import AddExpenseScreen from "../screens/Expenses/AddExpenseScreen";

const AppNavigation = () => {
  const AppStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="TabStack">
        <AppStack.Screen
          name="TabStack"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="AddCategorie"
          component={AddCategorie}
          options={{
            header: () => <HeaderCmp label={"Ajouter nouvelle catégorie"} />,
          }}
        />
        <AppStack.Screen
          name="AddExpenseScreen"
          component={AddExpenseScreen}
          options={{
            header: () => <HeaderCmp label={"Ajouter nouvelle dépense"} />,
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
