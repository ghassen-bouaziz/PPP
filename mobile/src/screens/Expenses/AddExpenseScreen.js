import { View, Text, Pressable, Modal, Platform } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment/moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const AddExpenseScreen = () => {
  const [payload, setPayload] = useState({
    amount: "",
    category: "",
    date: new Date(),
    description: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  function handleChange(key, value) {
    setPayload((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center justify-between my-2">
        <View className="items-center justify-center p-2 h-16 border-textSecondary bg-background border-3 w-2/12 rounded-lg">
          <Text className="text-textPrimary font-700Bold text-xl">TND</Text>
        </View>
        <TextInput
          label="Montant"
          value={payload?.amount}
          onChangeText={(text) => handleChange("amount", text)}
          className="bg-background rounded-lg shadow-md w-9/12  h-16"
          inputMode="decimal"
          keyboardType="decimal-pad"
        />
      </View>
      <View className="p-4 bg-background rounded-lg flex-row items-center justify-between my-2">
        <View className="h-8 w-8 bg-border rounded-full" />
        <Text>Choisissiez une catégorie</Text>
        <Pressable>
          <AntDesign name="arrowright" size={24} color="grey" />
        </Pressable>
      </View>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        className="p-4 bg-background rounded-lg flex-row items-center justify-between my-2"
      >
        <AntDesign name="calendar" size={24} color="black" />
        <Text>{moment(payload?.date)?.format("dddd, DD MMMM YYYY")}</Text>
        <View />
      </Pressable>

      {showDatePicker && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          {Platform.OS === "android" && (
            <View className="bg-background z-50">
              <RNDateTimePicker
                mode="date"
                value={new Date()}
                onChange={(event, selectedDate) =>
                  handleDateChange(event, selectedDate)
                }
                onTouchCancel={() => {
                  setShowDatePicker(false);
                }}
              />
            </View>
          )}
          {Platform.OS === "ios" && (
            <Pressable
              onPress={() => setShowDatePicker(false)}
              className="flex-1 justify-center items-center bg-[#00000080]"
            >
              <View className="p-4 rounded-xl bg-background">
                <DateTimePicker
                  themeVariant={"light"}
                  mode={"date"}
                  display="inline"
                  value={new Date()}
                  onChange={(event, selectedDate) => {
                    // handleDateChange(event, selectedDate);
                    handleChange("date",selectedDate)
                    setShowDatePicker(false)
                  }}
                  onTouchCancel={() => {
                    setShowDatePicker(false);
                  }}
                />
              </View>
            </Pressable>
          )}
        </Modal>
      )}
    </View>
  );
};

export default AddExpenseScreen;
