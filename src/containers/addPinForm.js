import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AddPin extends Component {

	render() {
		return (
			<div>

				
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	state
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPin);
