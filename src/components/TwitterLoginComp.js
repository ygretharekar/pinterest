import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

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

function SimpleAppBar(props) {
	
	const { classes } = props;

	const handleLogout = () => {
		props.logout();
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color= 'primary'>
				<Toolbar>
					<Typography variant="title" color="inherit" className={classes.flex}>
						Pinterest Clone
					</Typography>
					<Chip
						avatar={<Avatar src={ props.user.twitterProfileImg } />}
						label={ props.user.twitterScreenName }
						onDelete={handleLogout}
						className={classes.chip}
					/>
				</Toolbar>
			</AppBar>
		</div>
	);
}

SimpleAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
