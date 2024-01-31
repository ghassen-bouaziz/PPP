import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../style/colors";
import { useNavigation } from "@react-navigation/native";
import API from "../../services/api";

const AddCategorie = () => {
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    name: "",
    type: "-",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  function handleChange(key, value) {
    setPayload((prev) => ({ ...prev, [key]: value }));
  }
  async function submit() {
    setLoading(true);
    try {
      const result = await API.post("/categories", payload);
    } catch (error) {
      console.log("🚀 ~ submit ~ error:", error);
      !!error?.message && Alert.alert(error?.message);
    } finally {
      setLoading(false);
      navigation?.goBack();
    }
  }
  return (
    <View className="flex-1 p-4">
      <View className="w-full items-center justify-center flex-row my-3">
        <Pressable
          onPress={() => handleChange("type", "-")}
          className={`w-2/5 p-4 items-center justify-center rounded-l-2xl ${
            payload?.type === "+" ? "bg-background" : "bg-primary"
          }`}
        >
          <Text
            className={`text-base font-500Medium ${
              payload?.type === "+" ? "text-textPrimary" : "text-background"
            }`}
          >
            Dépense
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleChange("type", "+")}
          className={`w-2/5 p-4 items-center justify-center rounded-r-2xl ${
            payload?.type === "-" ? "bg-background" : "bg-primary"
          }`}
        >
          <Text
            className={`text-base font-500Medium ${
              payload?.type === "-" ? "text-textPrimary" : "text-background"
            }`}
          >
            Income
          </Text>
        </Pressable>
      </View>
      <View className="my-2">
        <TextInput
          value={payload?.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Nom catégorie"
          className="h-16 items-center p-3 rounded-xl bg-background shadow-lg text-textPrimary text-sm font-400Regular"
        />
      </View>
      <View className="my-2">
        <TextInput
          value={payload?.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Déscription catégorie"
          className="h-16 items-center p-3 rounded-xl bg-background shadow-lg text-textPrimary text-sm font-400Regular"
        />
      </View>
      <View className="my-2">
        <TextInput
          value={payload?.imageUrl}
          onChangeText={(text) => handleChange("imageUrl", text)}
          placeholder="Url image catégorie"
          className="h-16 items-center p-3 rounded-xl bg-background shadow-lg text-textPrimary text-sm font-400Regular"
        />
      </View>
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
    </View>
  );
};

export default AddCategorie;
