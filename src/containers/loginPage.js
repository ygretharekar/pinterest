import React, {Component} from 'react';
import {connect} from 'react-redux';

import {signIn} from '../actionPath/index';

export class TwitterLoginComp extends Component {

	componentWillMount() {
		this.props.signIn();
		setTimeout(() => this.props.history.push('/'), 1200);
	}
	
	render() {
		return (
			<div>
				<h1>
					twitter
				</h1>
				<h2>
					{this.props.user}
				</h2>
			</div>
		);
	}

}

const mapStateToProps = (state) => ({user: state.user.userInfo});

const mapDispatchToProps = {
	signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitterLoginComp);
