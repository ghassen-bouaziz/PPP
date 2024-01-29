import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { categoriesIncomeList } from "../../assets/data/categories";
import CategoryCmp from "./components/CategoryCmp";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../style/colors";

export default function IncomeScreen() {
  return (
    <View className="flex-1 py-4 bg-border">
      <Pressable className="flex-row items-center p-3 bg-background my-[2px]">
        <View className="bg-green rounded-full p-[0.5px]">
        <AntDesign name="plus" size={20} color={colors.background} />
        </View>
        <Text className="text-base text-green font-500Medium">
        <View className="w-3"/>
          Nouvelle catégorie
        </Text>
      </Pressable>
      <FlatList
        data={categoriesIncomeList}
        renderItem={({ item }) => <CategoryCmp data={item} type="income" />}
        keyExtractor={(_, index) => `cat_${index}`}
      />
    </View>
  );
}
