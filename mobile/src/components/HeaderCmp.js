import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../style/colors";
import { AntDesign } from "@expo/vector-icons";

const HeaderCmp = (props) => {
  const { label } = props;
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center justify-between mt-12 px-3">
      <Pressable
        className="p-2 items-center justify-center"
        onPress={() => navigation?.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color={colors.primary} />
      </Pressable>
      <Text className="text-primary font-500Medium text-base">{label}</Text>
      <View className="w-12" />
    </View>
  );
};

export default HeaderCmp;
