import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Platform, ToastAndroid } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import RadioForm from 'react-native-simple-radio-button';
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/Buttons/HeaderButton";
import * as themeActions from "../redux/actions/theme";

const SettingsScreen = props => {
    const theme = useSelector(state => state.theme);
    const [themeType, setThemeType] = useState(theme.themeType);
    const [fontSize, setFontSize] = useState(theme.fontSize);

    const dynamicStyle = {
        backgroundColor: themeType === "light" ? "#f5f6fa" : themeType === "dark" ? "#303030" : "#FAF5E9",
        font: {
            color: themeType === "light" ? "#303030" : themeType === "dark" ? "#ecf0f1" : "#5F3E22",
            fontSize: fontSize
        }
    }

    const themeProps = [
        {label: "Light", value: "light"},
        {label: "Dark", value: "dark"},
        {label: "Sepia", value: "sepia"}
    ];
    const fontSizeProps = [
        {label: "Small", value: 16},
        {label: "Medium", value: 20},
        {label: "Large", value: 24}
    ];
    const dispatch = useDispatch();

    const handleSave = useCallback(
        () => {
            const chosenTheme = {
                themeType: themeType,
                fontSize: fontSize
            }
            dispatch(themeActions.setTheme(chosenTheme));
            Platform.OS === "android" && ToastAndroid.show("Settings saved!", ToastAndroid.SHORT);
        },
        [themeType, fontSize],
    );

    useEffect(() => {
        props.navigation.setParams({save: handleSave});
    }, [handleSave]);

    return <View style={styles.screen} >
        <View style={styles.settingContainer}>
            <Text style={styles.settingLabel}>Reading Theme :</Text>
            <RadioForm
                radio_props={themeProps}
                initial={ themeProps.findIndex(tp => tp.value === theme.themeType) }
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196F3'}
                selectedButtonColor={'#2196F3'}
                animation={false}
                style={styles.radioForm}
                labelStyle={styles.label}
                onPress={(value) => setThemeType(value)}
            />
        </View>
        <View style={styles.settingContainer}>
            <Text style={styles.settingLabel}>Font Size :</Text>
            <RadioForm
                radio_props={fontSizeProps}
                initial={ fontSizeProps.findIndex(fsp => fsp.value === theme.fontSize) }
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196F3'}
                selectedButtonColor={'#2196F3'}
                animation={false}
                style={styles.radioForm}
                labelStyle={styles.label}
                onPress={(value) => setFontSize(value)}
            />
        </View>
        <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Preview :</Text>
            <View style={{...styles.themePreviewContainer, backgroundColor: dynamicStyle.backgroundColor}}>
                <Text style={{...styles.themePreviewTextArabic, color: dynamicStyle.font.color, fontSize: dynamicStyle.font.fontSize + 6}}>وَرَتِّلِ الْقُرْآنَ تَرْتِيلً٤</Text>
                <Text style={{...styles.themePreviewTextEnglish, ...dynamicStyle.font}}>And recite the Qur'an with measured recitation.(4)</Text>
            </View>
        </View>
    </View>
}

SettingsScreen.navigationOptions = navData => {
    const save = navData.navigation.getParam("save");

    return {
        headerTitle: "Settings",
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="menu"
                    iconName={ Platform.OS === "android" ? "md-menu" : "ios-menu" }
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        },
        headerRight: () => {
            return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="menu"
                    iconName={ Platform.OS === "android" ? "md-checkmark" : "ios-checkmark-circle-outline" }
                    onPress={() => save()}
                />
            </HeaderButtons>
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        backgroundColor: "white"
    },
    settingContainer: {
        width: "100%",
        marginVertical: 10
    },
    settingLabel: {
        fontFamily: "latin-regular",
        fontSize: 18
    },
    radioForm: {
        justifyContent: "space-around",
        marginVertical: 20,
    },
    label: {
        fontFamily: "latin-light",
        fontSize: 14,
        marginVertical: 3
    },
    themePreviewContainer: {
        padding: 20,
        borderRadius: 8,
        marginVertical: 8
    },
    themePreviewTextArabic: {
        fontFamily: "othmanic",
        direction: "rtl",
        textAlign: Platform.OS === "android" ? "right" : "left"
    },
    themePreviewTextEnglish: {
        fontFamily: "latin-regular"
    }
})

export default SettingsScreen;