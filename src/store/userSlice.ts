import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	address: "",
	token: 0,
	chainId: 1,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.address = action.payload.address;
			state.token = state.token + 1000;
			state.chainId = action.payload.chainId;
		},
		reset(state) {
			Object.assign(state, initialState);
		},
	},
});

export default userSlice;
