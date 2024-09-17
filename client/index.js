// import statements
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import ReactDOM from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';
import './styles.scss';

const Routing = () => {
	return (
	  <Router>
		<Routes>
		  <Route path='/home' element={<App />} />
		  <Route path='/' element={<Login />} />
		  <Route path='/signup' element={<Signup />} />
		</Routes>
	  </Router>
	);
  };
  
  const AppWithStore = () => (
	<Provider store={store}>
	  <Routing />
	</Provider>
  );
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<AppWithStore />);
