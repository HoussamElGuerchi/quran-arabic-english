import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import ChaptersScreen from "../screens/ChaptersScreen";
import VersesScreen from "../screens/VersesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createDrawerNavigator } from "react-navigation-drawer";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: "latin-bold"
    },
    headerBackTitleStyle: {
        fontFamily: "latin-bold"
    },
    headerTintColor: Colors.light
}

const HomeNavigator = createStackNavigator({
    Chapters: ChaptersScreen,
    Verses: VersesScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Ionicons
                name={Platform.OS === "android" ? "md-list-box" : "ios-list-box"}
                size={24}
                color={drawerConfig.tintColor}
            />
        }
    },
    defaultNavigationOptions: defaultStackNavOptions
})

const SettingsNavigator = createStackNavigator({
    Settings: SettingsScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Ionicons
                name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
                size={24}
                color={drawerConfig.tintColor}
            />
        }
    },
    defaultNavigationOptions: defaultStackNavOptions
})

const DrawerNavigator = createDrawerNavigator({
    Home: HomeNavigator,
    Settings: SettingsNavigator
}, {
    contentOptions: {
        labelStyle: {
            fontFamily: "latin-bold"
        }
    }
})

export default createAppContainer(DrawerNavigator);