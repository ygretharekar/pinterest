import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UserPage extends Component {

	render() {
		return (
			<div>
				<h1>
					Hello world
				</h1>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	state
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
