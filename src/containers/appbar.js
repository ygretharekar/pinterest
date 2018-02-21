import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, fetchAllPins } from '../actionPath/index';
import AppBarComp from '../components/AppBarComp';
import LoggedinBar from '../components/TwitterLoginComp';

class AppBar extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			user: false
		};

	}
	

	componentWillMount() {
		if(!this.props.authenticated) this.props.signIn();
		if(this.props.allPins.length === 0) this.props.fetchAllPins();
	}

	handleLogout(){
		this.props.signOut();
	}

	userRedirect(){
		this.setState(
			{
				user: true
			}
		);
	}

	render() {
		return (
			<div>
				{
					this.props.authenticated ? 
						<div>
							<LoggedinBar 
								logout={this.handleLogout.bind(this)}
								user={ this.props.user }
								redirect = {this.userRedirect.bind(this)}
								us = {this.state.user}
							/>
						</div>
						:
						<AppBarComp />
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.auth.isAuthenticated,
	user: state.user.userInfo,
	allPins: state.pin.allPins
});

const mapDispatchToProps = {
	signIn,
	signOut,
	fetchAllPins
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
