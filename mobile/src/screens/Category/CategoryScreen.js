import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  categoriesExpensesList,
  categoriesIncomeList,
} from "../../assets/data/categories";
import CategoryCmp from "./components/CategoryCmp";
import IncomeScreen from "./IncomeScreen";
import DepenseScreen from "./DepenseScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import API from "../../services/api";
import { useIsFocused } from "@react-navigation/native";

const CategoryScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  async function getPage() {
    try {
      setLoading(true);
      const result = await API.get("/categories");
      setCategories(result);
    } catch (error) {
      console.log("🚀 ~ getPage ~ error:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPage();

    return () => {};
  }, [isFocused]);

  const [showType, setShowType] = useState("income");
  return (
    <SafeAreaView className="flex-1">
      <Tab.Navigator>
        <Tab.Screen name="Incomes" children={ (props)=><IncomeScreen  {...props} data={categories?.filter(item=>item?.type === "+")} />} />
        <Tab.Screen name="Depenses" children={ (props)=><DepenseScreen {...props} data={categories?.filter(item=>item?.type === "-")}  />} />
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
