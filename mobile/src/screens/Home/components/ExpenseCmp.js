import { View, Text, Image } from "react-native";
import React from "react";
import moment from "moment";

const ExpenseCmp = (props) => {
  const { data } = props;
  return (
    <View className="w-11/12 self-center p-4 bg-backgroundSecondary my-2 rounded-lg flex-row items-center justify-between">
      <Image
        source={{ uri: data?.category?.imageUrl }}
        className="h-10 w-10"
        resizeMode="cover"
      />
      <View className="w-2" />

      <View>
        <Text className="text-primary text-base font-400Regular">
          {data?.category?.name}
        </Text>
        <Text className="text-textSecondary text-sm font-400Regular" numberOfLines={2}>
          {data?.description}
        </Text>
      </View>
      <View className="flex-1" />
      <View className="items-end">
        <Text className="text-lg text-textPrimary font-700Bold">
          {data?.category?.type} {data?.amount}
        </Text>
        <Text className="text-textSecondary text-xs font-400Regular">
          {moment(data?.date)?.format("dddd , DD MMM")}
        </Text>
      </View>
    </View>
  );
};

export default ExpenseCmp;
