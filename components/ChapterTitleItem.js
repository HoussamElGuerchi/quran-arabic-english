import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from "react-native";

import Colors from "../constants/Colors";

const ChapterTitleItem = props => {
    const TouchableComponent = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    return <View style={styles.content}>
        <TouchableComponent onPress={props.onPress}>
            <View style={styles.titlesContainer}>
                <Text style={styles.latinTitle}>{props.chapterNumber}. {props.englishTitle}</Text>
                <Text style={styles.arabicTitle}>{props.arabicTitle}</Text>
            </View>
        </TouchableComponent>
    </View>
};

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8,
        overflow: "hidden"
    },
    titlesContainer: {
        backgroundColor: Colors.light,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderRadius: 8
    },
    latinTitle: {
        fontFamily: "latin-regular",
        fontSize: 16,
        color: Colors.primary
    },
    arabicTitle: {
        fontFamily: "arabic-regular",
        textAlign: "right",
        direction: "rtl",
        color: Colors.primary
    }
});

export default ChapterTitleItem;