import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';

import List, {ListItem, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Typography from 'material-ui/Typography';

import {connect} from 'react-redux';
import { closeImageModal, likePin, unlikePin } from '../actionPath/index';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}


const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	},
	button: {
		marginTop: '1rem'
	},
	image: {
		maxWidth: '100%',
		maxHeight: '100%'
	}
});


class SimpleModal extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			red:  false
		};
	}
	
	handleClick(){
		if(this.props.authorized){
			this.state.red ?
				this.props.likePin(this.props.tile._id):
				this.props.unlikePin(this.props.tile._id);
		}
		this.setState({ red: !this.state.red });
	}

	render() {
		const { classes, show, closeImageModal, tile } = this.props;
		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={show}
					onClose={closeImageModal}
				>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="headline" component="h2">
							{tile.description}
						</Typography>
						<List>
							<ListItem>
								<ListItemText 
									primary={'By: ' +tile.addedBy.twitterScreenName} 
									secondary={'Added on: ' + tile.addedOn.split('T')[0]} 
								/>
							</ListItem>

						</List>
						<img src={tile.url} className={classes.image} alt="User"/>
						{
							this.props.authorized &&
							<IconButton
								color={ this.state.red ? 'secondary':'inherit'} 
								aria-label="Like"
								onClick={this.handleClick.bind(this)}
							>
								<FavoriteIcon />
							</IconButton>
						}						
					</div>
				</Modal>
			</div>
		);
	}
}


const mapStateToProps = state => (
	{
		authorized: state.auth.isAuthenticated,
		show: state.modal.imageModal,
		tile: state.modal.setImage
	}
);

const mapDispatchToProps = {
	closeImageModal,
	likePin,
	unlikePin
};

SimpleModal.propTypes = {
	classes: PropTypes.object.isRequired,
	show: PropTypes.bool.isRequired,
	tile: PropTypes.object.isRequired, 
	closeImageModal: PropTypes.func.isRequired 
};

const imageModal = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, mapDispatchToProps)(imageModal);