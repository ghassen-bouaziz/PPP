import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { colors } from "../../style/colors";
import API from "../../services/api";
import { useIsFocused } from "@react-navigation/native";
import ExpenseCmp from "./components/ExpenseCmp";

const chartConfig = {
  backgroundGradientFrom: colors.primary,
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: colors.primaryLight,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(2, 122, 242, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
export default function HomeScreen() {
  const isFocused = useIsFocused();
  const [expenses, setExpenses] = useState([]);
  const [categoriesWithExpenses, setCategoriesWithExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCatExp, setLoadingCatExp] = useState(false);
  async function getExpenses() {
    try {
      setLoading(true);
      const result = await API.get("/expenses");
      console.log("🚀 ~ getExpenses ~ result:", result);
      if (!result?.message) {
        setExpenses(result);
      }
    } catch (error) {
      console.log("🚀 ~ getExpenses ~ error:", error);
    } finally {
      setLoading(false);
    }
  }
  async function getCategoriesExpenses() {
    try {
      setLoadingCatExp(true);
      const result = await API.get("/categories/allWithExpenses");
      if (!result?.message) {
        const labels = result?.map((item) => item?.category?.name).slice(0, 3);
        const data = result
          ?.map((item) => (isNaN(item?.percentage) ? 0 : item?.percentage))
          .slice(0, 3);
        setTotal(result?.reduce((p, c) => p + c?.totalSum, 0));
        setCategoriesWithExpenses({ labels, data });
      }
    } catch (error) {
      console.log("🚀 ~ getExpenses ~ error:", error);
    } finally {
      setLoadingCatExp(false);
    }
  }
  useEffect(() => {
    getExpenses();
    getCategoriesExpenses();

    return () => {};
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 h-full bg-background"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getExpenses();
              getCategoriesExpenses();
            }}
          />
        }
      >
        <View className="bg-[#F4F6F8] w-full rounded-t-2xl p-4 items-center justify-center ">
          <Text className="text-base font-500Medium text-textPrimary p-3">
            Budget ce mois
          </Text>
          <Text className="text-3xl font-800ExtraBold text-textPrimary p-2">
            {total} TND
          </Text>
        </View>
        <View className="">
          <ProgressChart
            data={categoriesWithExpenses}
            width={Dimensions.get("window").width}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
          <FlatList
            data={expenses}
            renderItem={({ item }) => <ExpenseCmp data={item} />}
            keyExtractor={(_, index) => `exp_${index}`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
