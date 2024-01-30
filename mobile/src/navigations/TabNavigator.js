import { View, Text, StyleSheet, Animated, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "../screens/Home/HomeScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../style/colors";

const TabNavigator = () => {
    const _renderIcon = (routeName, selectedTab) => {
        let icon = "";
    
        switch (routeName) {
          case "HomeScreen":
            icon = "home";
            break;
          case "CategoryScreen":
            icon = "bars";
            break;
        }
    
        return (
          <AntDesign
            name={icon}
            size={25}
            color={routeName === selectedTab ? "black" : "gray"}
          />
        );
      };
      const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
          <TouchableOpacity
            onPress={() => navigate(routeName)}
            style={styles.tabbarItem}
          >
            {_renderIcon(routeName, selectedTab)}
          </TouchableOpacity>
        );
      };  return (
    <CurvedBottomBarExpo.Navigator
            type="DOWN"
            style={styles.bottomBar}
            shadowStyle={styles.shawdow}
            height={55}
            circleWidth={50}
            bgColor={colors.background}
            initialRouteName="HomeScreen"
            borderTopLeftRight
            screenOptions={{ headerShown: false }}
            renderCircle={({ selectedTab, navigate }) => (
              <Animated.View style={styles.btnCircleUp}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => Alert.alert("Click Action")}
                >
                  <AntDesign name="addfile" size={24} color="black" />
                </TouchableOpacity>
              </Animated.View>
            )}
            tabBar={renderTabBar}
          >
            <CurvedBottomBarExpo.Screen
              name="HomeScreen"
              position="LEFT"
              component={HomeScreen}
            />
            <CurvedBottomBarExpo.Screen
              name="CategoryScreen"
              component={CategoryScreen}
              position="RIGHT"
            />
          </CurvedBottomBarExpo.Navigator>
  )
}

export default TabNavigator

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdow: {
      shadowColor: "#DDDDDD",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
    },
    button: {
      flex: 1,
      justifyContent: "center",
    },
    bottomBar: {},
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E8E8E8",
      bottom: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: "gray",
    },
    tabbarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    img: {
      width: 30,
      height: 30,
    },
    screen1: {
      flex: 1,
      backgroundColor: "#BFEFFF",
    },
    screen2: {
      flex: 1,
      backgroundColor: "#FFEBCD",
    },
  });
  