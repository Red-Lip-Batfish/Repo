// import statements
import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchLists, getUsername } from '../slice';
import { useSelector } from 'react-redux';
// define Login component
const Login = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const stateLists = useSelector((state) => state.lists.lists)
	// define onClick functionality for the login button
	const login = async () => {
		const username = document.getElementById('usernameInput').value;
		const password = document.getElementById('passwordInput').value;
		// navigate({
		// 	pathname: '/home',
		// });
		const requestBody = { username, password };
		const data = await axios.post('/login', requestBody)
		  .then((res) => {
		    if(res.status === 200) {
				// console.log(res.data[0].username)
				if(stateLists.length == 0) {
				
				dispatch(getUsername(res.data[0].username))
				console.log('here', res.data[0].username)
				dispatch(fetchLists(res.data[0].lists))
				}
				// console.log('res', res.data[0].lists)
		      navigate({
		        pathname: '/home',
		        search: `?username=${username}`});
		    }});
	};

	// render username and password inputs, login and signup buttons
	return (
		<div className='login'>
			<h1>Log In</h1>
			<input type='text' placeholder='Username' id='usernameInput' />
			<input type='text' placeholder='Password' id='passwordInput' />
			<button onClick={login}>Log In</button>
			<span>
				<Link to='/signup'>Sign Up</Link>
			</span>
		</div>
	);
};

export default Login;
