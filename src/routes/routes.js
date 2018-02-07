import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Appbar from '../containers/appbar';
import LoginPage from '../containers/loginPage';

export default class Routes extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Switch>
							<Route exact path="/" component={Appbar} />
							<Route exact path="/login" component={LoginPage} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}
