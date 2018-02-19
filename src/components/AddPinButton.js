import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		position: 'relative',
		top: '30rem',
		float: 'right'
	}
});

function FloatingActionButtons(props) {
	const { classes } = props;
	return (
		<div>
			<Button 
				variant="fab" 
				color="primary" 
				aria-label="add"
				onClick={props.click}
				className={classes.button}
			>
				<AddIcon />
			</Button>
		</div>
	);
}

FloatingActionButtons.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);