import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../screens/Layout';
import Home from '../screens/Home';
import About from '../screens/About';
import Login from '../screens/Login';

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home}/>
		<Route path='/about' component={About}/>
		<Route path='/login' component={Login}/>
	</Route>
);
