import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPinButton from '../components/AddPinButton';
import AddPinModal from '../components/addPinModal';

import { showAddModal } from '../actionPath/index';

export class AllPins extends Component {
	

	/* constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}
	
	handleClick(){
		this.setState(
			{
				show: true
			}
		);
	}

	handleClose(){
		this.setState(
			{
				show: false
			}
		);
	} */

	render() {
		return (
			<div>
				{
					this.props.authenticated &&
					<AddPinButton click={this.props.showAddModal} />
				}

				<AddPinModal />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
	showAddModal
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPins);
