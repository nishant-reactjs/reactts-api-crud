import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './thunk';
import { User } from '../../types/auth';


const Token = localStorage.getItem('Token');
const initialState: User = { isLoggedIn: false, token: Token, isLoading: false, error: '' };

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {

	},
	extraReducers(builder) {
		builder
			.addCase(userLogin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.token = action.payload.userToken;
				localStorage.setItem('Token', JSON.stringify(action.payload.userToken));
				state.isLoggedIn = true;
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				state.isLoggedIn = false;
			});
	}
});



export default UserSlice.reducer;