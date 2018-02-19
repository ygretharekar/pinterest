import React, { Component } from 'react';
import { connect } from 'react-redux';

export default Comp => {

	class RequireAuth extends Component {
		componentWillMount() {
			if(!this.props.authenticated) this.props.history.push('/');
		}		

		componentWillReceiveProps(nextProps) {
			if(!nextProps.authenticated) this.props.history.push('/');
		}
		
		render() {
			return (
				<Comp {...this.props} />
			);
		}
	}
	
	const mapStateToProps = (state) => ({
		authenticated: state.auth.isAuthenticated
	});
	
	return connect(mapStateToProps)(RequireAuth);
};
