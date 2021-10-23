const getDynamicStyle = (theme) => {
    return {
        backgroundColor: theme.themeType === "light" ? "#f5f6fa" : theme.themeType === "dark" ? "#303030" : "#FAF5E9",
        font: {
            color: theme.themeType === "light" ? "#303030" : theme.themeType === "dark" ? "#ecf0f1" : "#5F3E22",
            fontSize: theme.fontSize
        }
    }
};

export default getDynamicStyle;