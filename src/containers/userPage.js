import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
// import Button from 'material-ui/Button';
import DeleteForever from 'material-ui-icons/DeleteForever';
import {fetchLoggedInPin, fetchPinsUser, deletePin } from '../actionPath/index';

import { Link } from 'react-router-dom';

const styles = {
	root: {
		width: '100%'
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	}
};

export class UserPage extends Component {

	componentWillMount() {
		this.props.fetchLoggedInPin();
	}

	handleClick(tile){

		console.log('====================================');
		console.log(tile);
		console.log('====================================');

		this.props.deletePin(tile._id);
	}

	render() {
		const { classes, tileData } = this.props;
		const handleClick = this.handleClick.bind(this);

		return (
			<div>
				<AppBar position="static" color= 'primary'>
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
						Pinterest Clone
						</Typography>
						<Button
							color="inherit"
							children={
								<Link to='/'>
									Back
								</Link>
							}
						/>
					</Toolbar>
				</AppBar>
				<div>
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
														<DeleteForever />
													</IconButton>
												}
											/>
										</GridListTile>
									)
								)
						}
					</GridList>
				</div>
			</div>			
		);
	}	
}

const mapStateToProps = (state) => ({
	tileData: state.pin.signedInPins
});

const mapDispatchToProps = {
	fetchLoggedInPin, 
	fetchPinsUser,
	deletePin
};

const userPageComp = withStyles(styles)(UserPage);

export default connect(mapStateToProps, mapDispatchToProps)(userPageComp);
