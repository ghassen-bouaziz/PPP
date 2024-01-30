import { View, Text, Image } from "react-native";
import React from "react";

export default function CategoryCmp(props) {
  const { data, type = "" } = props;
  return (
    <View className="my-[2px] flex-row  bg-background p-3">
      {/* <View
        className={`h-8 w-8 rounded-lg ${
          type === "income" ? "bg-primary" : "bg-orange"
        }`}
      /> */}
      <Image source={{ uri: data?.imageUrl }}
      className="h-10 w-10 "
      resizeMode="cover"
      />
      <View className="w-4" />
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
