import { View, Text, Image, Pressable } from "react-native";
import React from "react";

const CatCmp = (props) => {
  const { data,select } = props;
  return (
    <Pressable
    onPress={()=>select(data)}
    className="flex-row w-full m-auto my-2 items-center">
      <Image
        source={{ uri: data?.imageUrl }}
        className="h-12 w-12"
        resizeMode="contain"
      />
      <View className="w-4" />
      <Text
        className="text-textPrimary text-sm font-400Regular"
        numberOfLines={1}
      >
        {data?.name}
      </Text>
    </Pressable>
  );
};

export default CatCmp;
