import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Appbar from '../containers/appbar';
import AllPins from '../containers/allPins';

export default class Routes extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Appbar />
						<Switch>
							<Route exact path="/" component={AllPins} />	
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
