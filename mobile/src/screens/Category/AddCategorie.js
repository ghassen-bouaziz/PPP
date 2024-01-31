import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../style/colors";
import { useNavigation } from "@react-navigation/native";
import API from "../../services/api";
import { AntDesign } from "@expo/vector-icons";
import catImages from "../../../assets/catImages";
import SelectImageModal from "./components/SelectImageModal";

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
      console.log("🚀 ~ submit ~ result:", result);
    } catch (error) {
      console.log("🚀 ~ submit ~ error:", error);
      !!error?.message && Alert.alert(error?.message);
    } finally {
      setLoading(false);
      navigation?.goBack();
    }
  }
  const [showImgMdl, setShowImgMdl] = useState(false);
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
      <Pressable
        onPress={() => setShowImgMdl(true)}
        className="flex-row items-center justify-between my-2 rounded-xl bg-background shadow-lg p-4"
      >
        <Text className="text-textPrimary font-500Medium text-base">Image</Text>
        {payload?.imageUrl ? (
          <Image
            source={{ uri: payload?.imageUrl }}
            className="h-12 w-12"
            resizeMode="contain"
          />
        ) : (
          <AntDesign name="arrowright" size={24} color="grey" />
        )}
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
      {showImgMdl && (
        <SelectImageModal
          visible={showImgMdl}
          setVisible={setShowImgMdl}
          submit={(item) => {
            handleChange("imageUrl", item);
          }}
        />
      )}
    </View>
  );
};

export default AddCategorie;
