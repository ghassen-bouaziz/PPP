import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  categoriesExpensesList,
  categoriesIncomeList,
} from "../../assets/data/categories";
import CategoryCmp from "./components/CategoryCmp";
import IncomeScreen from "./IncomeScreen";
import DepenseScreen from "./DepenseScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const CategoryScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  const [showType, setShowType] = useState("income");
  return (
    <SafeAreaView className="flex-1">
      <Tab.Navigator>
        <Tab.Screen name="IncomeScreen" component={IncomeScreen} />
        <Tab.Screen name="DepenseScreen" component={DepenseScreen} />
      </Tab.Navigator>

      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 bg-background"
      >
        <Pressable
          onPress={() => setShowType("income")}
          className="w-full h-14 bg-green items-center justify-center"
        >
          <Text className="text-base text-background font-700Bold">
            Revenus
          </Text>
        </Pressable>
        {showType === "income" && (
          <View className=" p-4">
            <FlatList
              scrollEnabled={false}
              data={categoriesIncomeList}
              renderItem={({ item }) => (
                <CategoryCmp data={item} type="income" />
              )}
              keyExtractor={(_, index) => `cat_${index}`}
            />
          </View>
        )}
        <Pressable
          onPress={() => setShowType("depense")}
          className="w-full h-14 bg-red items-center justify-center"
        >
          <Text className="text-base text-background font-700Bold">
            Dépenses
          </Text>
        </Pressable>
        {showType === "depense" && (
          <View className=" p-4">
            <FlatList
              scrollEnabled={false}
              data={categoriesExpensesList}
              renderItem={({ item }) => <CategoryCmp data={item} />}
              keyExtractor={(_, index) => `cat_${index}`}
            />
          </View>
        )}
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default CategoryScreen;
