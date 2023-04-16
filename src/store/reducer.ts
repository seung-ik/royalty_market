import { combineReducers } from "redux";

import userSlice from "./userSlice";

const rootReducer = combineReducers({
	user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
