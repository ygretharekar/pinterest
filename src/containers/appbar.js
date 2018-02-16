import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actionPath/index';

import AppBarComp from '../components/AppBarComp';
import LoggedinBar from '../components/TwitterLoginComp';

class AppBar extends Component {

	componentWillMount() {
		this.props.signIn();
	}

	handleLogout(){
		this.props.signOut();
	}

	render() {
		return (
			<div>
				{
					this.props.authenticated ? 
						<LoggedinBar 
							logout={this.handleLogout.bind(this)}
							user={ this.props.user }
						/>:
						<AppBarComp />

				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.auth.isAuthenticated,
	user: state.user.userInfo
});

const mapDispatchToProps = {
	signIn,
	signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
