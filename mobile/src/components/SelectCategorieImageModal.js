import { View, Text, Modal, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../services/api";
import CatCmp from "./CatCmp";

const SelectCategorieImageModal = (props) => {
  const { visible, setVisible, selected, submit } = props;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getPage() {
    try {
      setLoading(true);
      const result = await API.get("/categories");
      setCategories(result);
    } catch (error) {
      console.log("🚀 ~ getPage ~ error:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPage();

    return () => {};
  }, []);
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable
        // onPress={() => setShowDatePicker(false)}
        className="flex-1 justify-center items-center bg-[#00000080]"
      >
        <View className="bg-background p-4 rounded-lg w-11/12">
          <Text className="text-textPrimary font-600SemiBold text-base text-center">
            Choisissiez une categorie
          </Text>
          <FlatList
            contentContainerStyle={{
              // alignItems: "center",
              // justifyContent: "center",
              width: "100%",
            }}
            // numColumns={3}
            data={categories}
            renderItem={({ item }) => (
              <CatCmp
                data={item}
                select={(c) => {
                  submit(c);
                  setVisible(false);
                }}
              />
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SelectCategorieImageModal;
