// import statements
import React from 'react';
import { useDispatch } from 'react-redux';
import { thunks } from '../slice.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { deleteAllLists } from '../slice.js';
import axios from 'axios';
// TO DO:
// add button functionality
// in order to access and manipulate state, will you need to implement useSelector and/or useDispatch here?

const Toolbar = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const username = useSelector((state) => state.lists.username)
	const deleteAllLists1 = async() => {
		try {
		  dispatch(deleteAllLists())
		  console.log(username)
		  const response = await axios.post('/deleteAllLists', {username: username})
		  console.log(response.data)
		} catch (error) {
		  console.error(error)
		}
	  }
	return (
		<div className='toolBar'>
			<div className = 'title'>Welcome, {username}!</div>
			<div className='right-align'>
				<button onClick={() => dispatch(thunks.createListThunk())}>
					Add List
				</button>
				<button onClick={deleteAllLists1}>NO MORE RESPONSIBILITY</button>
				<button onClick={() => navigate('/')}>Sign Out</button>
			</div>
		</div>
	);
};

export default Toolbar;
