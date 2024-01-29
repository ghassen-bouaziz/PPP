import { View, Text } from "react-native";
import React from "react";

export default function CategoryCmp(props) {
  const { data, type = "" } = props;
  return (
    <View className="my-[2px] flex-row  bg-background p-3">
      <View
        className={`h-8 w-8 rounded-lg ${
          type === "income" ? "bg-primary" : "bg-orange"
        }`}
      />
      <View className="w-2" />
      <View>
        <Text className="text-base font-600SemiBold text-textPrimary">
          {data?.name}
        </Text>
        <Text className="text-sm font-400Regular text-textSecondary">
          {data?.description}
        </Text>
      </View>
    </View>
  );
}
