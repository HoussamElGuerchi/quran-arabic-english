import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import AppNavigator from "./navigation/AppNavigator";
import store from "./redux/store";

const fetchFonts = () => {
  return Font.loadAsync({
    "latin-light": require("./assets/fonts/Merriweather-Light.ttf"),
    "latin-regular": require("./assets/fonts/Merriweather-Regular.ttf"),
    "latin-bold": require("./assets/fonts/Merriweather-Bold.ttf"),
    "othmanic": require("./assets/fonts/UthmanicHafs.otf"),
    "arabic-light": require("./assets/fonts/Almarai-Light.ttf"),
    "arabic-regular": require("./assets/fonts/Almarai-Regular.ttf"),
    "arabic-bold": require("./assets/fonts/Almarai-Bold.ttf"),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }
  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}
