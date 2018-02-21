import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
// import Button from 'material-ui/Button';
import InfoIcon from 'material-ui-icons/Info';
import { showImageModal, setImage } from '../actionPath/index';

// import tiles from '../test assets/tiledata';
import ImageZoom from './ImageZoom';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		width: '80%'
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	}
});

function TitlebarGridList(props) {
	const { classes } = props;

	const tileData = props.allPins;

	const {showImageModal, setImage} = props;

	const handleClick = tile => {
		setImage({setImage: tile});
		showImageModal();
	};

	return (
		<div className={classes.root}>
			<GridList cellHeight={180} className={classes.gridList}>
				<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
					<Subheader component="div">Pins</Subheader>
				</GridListTile>
				{
					tileData
						.map(
							(tile, i) => (
								<GridListTile key={i}>
									<img src={tile.url} alt={tile.description} />
									<GridListTileBar
										title={tile.description}
										subtitle={<span>by: {tile.addedBy.twitterScreenName}</span>}
										actionIcon={
											<IconButton 
												className={classes.icon}
												onClick={ () => handleClick(tile)}							
											>
												<InfoIcon />
											</IconButton>
										}
									/>
								</GridListTile>
							)
						)
				}
			</GridList>
			{
				props.show &&
				<ImageZoom />
			}
		</div>
	);
}

TitlebarGridList.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authorized: state.auth.isAuthorized,
	allPins: state.pin.allPins,
	show: state.modal.imageModal
});


const mapDispatchToProps = {
	showImageModal,
	setImage
};

const List = connect(mapStateToProps, mapDispatchToProps)(TitlebarGridList);

export default withStyles(styles)(List);