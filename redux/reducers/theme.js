import { SET_THEME } from "../actions/theme";

const initialState = {
    themeType: "dark",
    fontSize: 20
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_THEME:
            return {
                ...state,
                themeType: action.payload.themeType,
                fontSize: action.payload.fontSize
            }
    }
    return state;
}