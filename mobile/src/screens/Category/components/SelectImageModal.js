import {
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";

const SelectImageModal = (props) => {
  const { visible, setVisible, submit } = props;
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable
        onPress={() => setVisible(false)}
        className="flex-1 justify-center items-center bg-[#00000080]"
      >
        <View className="p-4 rounded-xl bg-background w-11/12">
          <FlatList
            data={catImages}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  submit(item);
                  setVisible(false);
                }}
                style={styles.itemContainer}
              >
                <Image
                  source={{ uri: item }}
                  className="h-20 w-20"
                  resizeMode="contain"
                />
              </Pressable>
            )}
            keyExtractor={(_, index) => `img_${index}`}
            numColumns={4}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default SelectImageModal;

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
  },
  itemContainer: {
    //   flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   height: 22,
    //   margin: 5,
    //   backgroundColor: "lightblue",
    //   borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
