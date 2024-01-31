import { View, Text, Modal, Pressable } from "react-native";
import React from "react";

const SelectCategorieImageModal = (props) => {
  const { visible, setVisible, selected, submit } = props;
  return (
    <Modal>
      <Pressable
        onPress={() => setShowDatePicker(false)}
        className="flex-1 justify-center items-center bg-[#00000080]"
      ></Pressable>
    </Modal>
  );
};

export default SelectCategorieImageModal;
