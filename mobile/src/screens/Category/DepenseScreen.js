import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { categoriesExpensesList } from "../../assets/data/categories";
import CategoryCmp from "./components/CategoryCmp";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../style/colors";
import { useNavigation } from "@react-navigation/native";

const DepenseScreen = (props) => {
  const { data = [] } = props;
  const navigation = useNavigation();
  return (
    <View className="flex-1 py-4 bg-border">
      <Pressable
        onPress={() => navigation?.navigate("AddCategorie")}
        className="flex-row items-center p-3 bg-background my-[2px]"
      >
        <View className="bg-green rounded-full p-[0.5px]">
          <AntDesign name="plus" size={20} color={colors.background} />
        </View>
        <Text className="text-base text-green font-500Medium">
          <View className="w-3" />
          Nouvelle catégorie
        </Text>
      </Pressable>
      <FlatList
        data={data}
        renderItem={({ item }) => <CategoryCmp data={item} type="depense" />}
        keyExtractor={(_, index) => `cat_${index}`}
      />
    </View>
  );
};

export default DepenseScreen;
