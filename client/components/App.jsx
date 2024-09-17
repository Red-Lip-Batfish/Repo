import React, { useEffect } from 'react';
import Toolbar from './Toolbar.jsx';
import ListGenerator from './ListGenerator.jsx';
// import store from '../store.js';
// import { findInitialState } from '../slice.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLists } from '../slice.js';
const App = (props) => {
	// this should update state from the DB when app renders
	// const dispatch = useDispatch();
	// // store.dispatch(findInitialState());
	// // const lists = useSelector((state) => state.lists);
	// useEffect(() => {
	// 	fetch('/home')
	// 		.then((data) => data.json())
	// 		.then((data) => dispatch(fetchLists(data)));
	// }, []);

	return (
		<div>
			<Toolbar />
			<ListGenerator />
		</div>
	);
};

export default App;
