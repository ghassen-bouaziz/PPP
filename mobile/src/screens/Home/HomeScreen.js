import { View, Text, SafeAreaView } from "react-native";
import React from "react";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 h-full bg-background">
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
}
