import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";

import getDynamicStyle from "../redux/DynamicStyle";

const convertToArabicNumber = number => {
    const numbers = {
        "1": "١",
        "2": "٢",
        "3": "٣",
        "4": "٤",
        "5": "٥",
        "6": "٦",
        "7": "٧",
        "8": "٨",
        "9": "٩",
        "0": "٠"
    };
    const stringifiedNumer =number.toString();
    let stringifiedArabicNumer = "";

    for (let i = 0; i < stringifiedNumer.length; i++) {
        stringifiedArabicNumer = `${stringifiedArabicNumer}${numbers[stringifiedNumer[i]]}`;
    }

    return stringifiedArabicNumer;
}

const Verse = props => {
    const theme = useSelector(state => state.theme);

    // const dynamicStyle = {
    //     backgroundColor: theme.themeType === "light" ? "#f5f6fa" : theme.themeType === "dark" ? "#303030" : "#FAF5E9",
    //     font: {
    //         color: theme.themeType === "light" ? "#303030" : theme.themeType === "dark" ? "#ecf0f1" : "#5F3E22",
    //         fontSize: theme.fontSize
    //     }
    // }

    const dynamicStyle = getDynamicStyle(theme);

    return <View style={{...styles.content, backgroundColor: dynamicStyle.backgroundColor}}>
        <Text style={{...styles.textArabic,
            color: dynamicStyle.font.color,
            fontSize: dynamicStyle.font.fontSize+6
        }}>
            {props.textAr} {convertToArabicNumber(props.verseNumber)}
        </Text>
        <Text style={{...styles.textLatin, ...dynamicStyle.font}}>{props.textEn} ({props.verseNumber})</Text>
    </View>
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        borderRadius: 8,
        padding: 20,
        marginVertical: 10
    },
    textArabic: {
        fontFamily: "othmanic",
        textAlign: Platform.OS === "android" ? "right" : "left",
        direction: "rtl",
        marginBottom: 10,
    },
    textLatin: {
        fontFamily: "latin-regular",
        textAlign: "left",
    },
})

export default Verse;