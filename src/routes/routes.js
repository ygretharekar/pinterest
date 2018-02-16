import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Appbar from '../containers/appbar';

export default class Routes extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Switch>
							<Route exact path="/" component={Appbar} />	
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
