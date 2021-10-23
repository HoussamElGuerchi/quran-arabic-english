import React from "react";
import { View, ScrollView, StyleSheet, ImageBackground, Text } from "react-native";
import { useSelector } from "react-redux";

import TEXT from "../data/text-ar-en";
import Verse from "../components/Verse";
import background from "../assets/images/quran-background.jpg";

const VersesScreen = props => {
    const chapterId = props.navigation.getParam("chapter");
    const chapterName = props.navigation.getParam("name");
    const title = props.navigation.getParam("title");
    const verses = TEXT.filter(verse => verse.surah_number === chapterId);

    const theme = useSelector(state => state.theme);

    return <ScrollView showsVerticalScrollIndicator={false} style={{
            ...styles.screen,
            backgroundColor: theme.themeType === "light" ? "white" : theme.themeType === "dark" ? "#1F1F1F" : "#FAF5E9"
    }}>
        <View style={styles.titleContainer}>
            <ImageBackground source={background} style={styles.image} >
                <Text style={styles.titleArabic}>{chapterName}</Text>
                <Text style={styles.titleEnglish}>Surat {title}</Text>
            </ImageBackground>
        </View>
        <View style={styles.versesContainer}>
            {
                verses.map(verse => {
                    return <Verse
                        key={verse.verse_number}
                        verseNumber={verse.verse_number}
                        textAr={verse.text}
                        textEn={verse.translation}
                    />
                })
            }
        </View>
    </ScrollView>
}

VersesScreen.navigationOptions = navigationData => {
    return {
        headerTitle: navigationData.navigation.getParam("title")
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    versesContainer: {
        margin: 20
    },
    titleContainer: {
        width: "100%", 
        height: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "100%", 
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center"
    },
    titleArabic: {
        fontFamily: "arabic-bold",
        fontSize: 30,
        textAlign: "left",
        direction: "rtl",
        marginBottom: 10,
        color: "white"
    },
    titleEnglish: {
        fontFamily: "latin-bold",
        fontSize: 26,
        textAlign: "left",
        color: "white"
    }
})

export default VersesScreen;