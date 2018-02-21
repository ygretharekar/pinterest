import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// import Appbar from '../containers/appbar';
import AllPins from '../containers/allPins';
import UserPage from '../containers/userPage';

export default class Routes extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Switch>
							<Route exact path="/" component={AllPins} />	
							<Route exact path="/user" component={UserPage} />	
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
