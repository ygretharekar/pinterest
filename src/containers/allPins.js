import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPinButton from '../components/AddPinButton';
import AddPinModal from '../components/addPinModal';
import AllPinsComp from '../components/allPinsComp';

import AppBar from './appbar';

import { showAddModal } from '../actionPath/index';

export class AllPins extends Component {

	render() {
		return (
			<div>
				<AppBar />
				{
					this.props.authenticated &&
					<div>
						<AddPinButton click={this.props.showAddModal} />
						<AddPinModal />
					</div>
				}
				<AllPinsComp  />
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
