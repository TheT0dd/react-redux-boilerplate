import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../views/Layout';
import Home from '../views/Home';
import About from '../views/About';

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home}/>
		<Route path='/about' component={About}/>
	</Route>
);
