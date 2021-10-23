import React from "react";
import { FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import SURAHS from "../data/surahs";
import ChapterTitle from "../components/ChapterTitleItem";
import CustomHeaderButton from "../components/Buttons/HeaderButton";

const ChaptersScreen = props => {
    return (
        <FlatList
            data={SURAHS}
            keyExtractor={item => item.number.toString()}
            renderItem={itemData => {
                return <ChapterTitle
                    chapterNumber={itemData.item.number}
                    englishTitle={itemData.item.transliteration_en}
                    arabicTitle={itemData.item.name}
                    onPress={() => {
                        props.navigation.navigate("Verses", {
                            chapter: itemData.item.number,
                            title: itemData.item.transliteration_en,
                            name: itemData.item.name
                        });
                    }}
                />
            }}
            style={{paddingVertical: 10, backgroundColor: "white"}}
        />
    )
}

ChaptersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Chapters",
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="menu"
                    iconName={ Platform.OS === "android" ? "md-menu" : "ios-menu" }
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        }
    }
}

export default ChaptersScreen;