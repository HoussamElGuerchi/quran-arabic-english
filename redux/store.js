import { createStore, combineReducers } from "redux";
import themeReducer from "./reducers/theme";

const rootReducer = combineReducers({
    theme: themeReducer
})

const store = createStore(rootReducer);

export default store;