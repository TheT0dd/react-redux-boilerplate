import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../screens/Layout';
import Home from '../screens/Home';
import About from '../screens/About';

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home}/>
		<Route path='/about' component={About}/>
	</Route>
);
