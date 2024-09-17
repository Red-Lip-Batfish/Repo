import { configureStore } from '@reduxjs/toolkit';
import listsSlice from './slice.js';
import { initialState } from './slice.js';
import { apiSlice } from './api.js';

const store = configureStore({
	reducer: {
		lists: listsSlice,
	}
	
});


export default store;
