import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	address: "",
	token: 0,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.address = action.payload.address;
			state.token = action.payload.token;
		},
	},
});

export default userSlice;
