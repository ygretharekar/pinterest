import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';



const styles = theme => ({
	card: {
		maxWidth: 400,
	},
	media: {
		height: 194,
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
		marginLeft: 'auto',
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

class RecipeReviewCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
	}
	
	handleExpandClick() {
		this.setState({ expanded: !this.state.expanded });
	}

	render() {
		const { classes } = this.props;
		
		return (
			<div>
				<Card className={classes.card}>
					<CardHeader
						avatar={
							<Avatar aria-label="Recipe" className={classes.avatar}>
								R
							</Avatar>
						}
						action={
							<IconButton>
								<MoreVertIcon />
							</IconButton>
						}
						title="Shrimp and Chorizo Paella"
						subheader="September 14, 2016"
					/>
					<CardMedia
						className={classes.media}
						image="/static/images/cards/paella.jpg"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography component="p">
							This impressive paella is a perfect party dish and a fun meal to cook together with
							your guests. Add 1 cup of frozen peas along with the mussels, if you like.
						</Typography>
					</CardContent>
					
					<CardActions className={classes.actions} disableActionSpacing>
						<IconButton aria-label="Add to favorites">
							<FavoriteIcon />
						</IconButton>
						<IconButton aria-label="Share">
							<ShareIcon />
						</IconButton>
						<IconButton
							className={classnames(classes.expand, {
								[classes.expandOpen]: this.state.expanded,
							})}
							onClick={this.handleExpandClick}
							aria-expanded={this.state.expanded}
							aria-label="Show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>
					<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph variant="body2">
								Method:
							</Typography>
							<Typography paragraph>
								Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
								minutes.
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</div>
		);
	}
}

RecipeReviewCard.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	tile: state.modal.setImag
});

const mapDispatchToProps = {

};

const cardModal = withStyles(styles)(RecipeReviewCard);

export default connect(mapStateToProps, mapDispatchToProps)(cardModal);