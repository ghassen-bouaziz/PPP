import {
  View,
  Text,
  Pressable,
  Modal,
  Platform,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment/moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../style/colors";
import API from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import SelectCategorieImageModal from "../../components/SelectCategorieImageModal";

const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    amount: "",
    categoryId: "65b957b3328c5fec362b4cdb",
    date: new Date(),
    description: "",
    type: "+",
  });
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSelectCatMdl, setShowSelectCatMdl] = useState(false);
  function handleChange(key, value) {
    setPayload((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    if (!payload?.amount && !payload.category) return;
    setLoading(true);
    try {
      const result = await API.post("/expenses", payload);
    } catch (error) {
    } finally {
      setLoading(false);
      navigation?.goBack();
    }
  }
  return (
    <View className="flex-1 h-full p-4">
      <View className="flex-row items-center justify-between my-2 bg-background shadow-lg rounded-lg h-16">
        <View className="items-center justify-center border-textSecondary border-3 w-2/12 rounded-lg h-full">
          <Text className="text-textSecondary font-600SemiBold text-xl">
            TND
          </Text>
        </View>
        <TextInput
          placeholder="Montant"
          value={payload?.amount}
          onChangeText={(text) => handleChange("amount", text)}
          className="p-4 w-10/12  h-16"
          placeholderTextColor={colors.textSecondary}
          inputMode="decimal"
          keyboardType="decimal-pad"
        />
      </View>
      <Pressable
        onPress={() => setShowSelectCatMdl(true)}
        className="p-4 bg-background rounded-lg flex-row items-center justify-between my-2"
      >
        {selectedOrg?.imageUrl ? (
          <Image
            source={{ uri: selectedOrg?.imageUrl }}
            className="h-10 w-10"
            resizeMode="contain"
          />
        ) : (
          <View className="h-8 w-8 bg-border rounded-full" />
        )}
        {selectedOrg?.name ? (
          <Text className="text-lg text-textPrimary font-600SemiBold">
            {selectedOrg?.name}
          </Text>
        ) : (
          <Text className="text-lg text-textSecondary font-600SemiBold">
            Choisissiez une catégorie
          </Text>
        )}
        <Pressable>
          <AntDesign name="arrowright" size={24} color="grey" />
        </Pressable>
      </Pressable>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        className="p-4 bg-background rounded-lg flex-row items-center justify-between my-2"
      >
        <AntDesign name="calendar" size={24} color={colors.textSecondary} />
        <Text>{moment(payload?.date)?.format("dddd, DD MMMM YYYY")}</Text>
        <View />
      </Pressable>

      <Pressable
        onPress={() => setShowDatePicker(true)}
        className="p-4 bg-background rounded-lg flex-row items-center justify-between my-2"
      >
        <AntDesign name="infocirlceo" size={24} color={colors.textSecondary} />
        <TextInput
          className="w-11/12 px-3 text-textPrimary font-400Regular text-sm h-full items-center"
          placeholder="Déscription"
          placeholderTextColor={colors.textSecondary}
          value={payload?.description}
          onChangeText={(text) => handleChange("description", text)}
        />
      </Pressable>
      <View className="flex-1" />
      <Pressable
        onPress={submit}
        className="m-4 w-11/12 bg-primary items-center justify-center p-2 rounded-xl"
      >
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text className="text-base font-800ExtraBold text-background">
            Ajouter
          </Text>
        )}
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
                onChange={(event, selectedDate) => {
                  handleChange("date", selectedDate);
                  // handleDateChange(event, selectedDate);
                }}
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
                    handleChange("date", selectedDate);
                    setShowDatePicker(false);
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
      {showSelectCatMdl && (
        <SelectCategorieImageModal
          visible={showSelectCatMdl}
          setVisible={setShowSelectCatMdl}
          selected={selectedOrg}
          submit={(item) => {
            setSelectedOrg(item);
            handleChange("categoryId", item?._id);
          }}
        />
      )}
    </View>
  );
};

export default AddExpenseScreen;
