import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import validUrl from 'valid-url';

import {connect} from 'react-redux';
import { addPin, closeAddModal } from '../actionPath';

// import Snackbar from 'material-ui/Snackbar';
// import Slide from 'material-ui/transitions/Slide';

/* function rand() {
	return Math.round(Math.random() * 20) - 10;
} */

function getModalStyle() {
	const top = 50 ;
	const left = 50 ;

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
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '25rem'
	},
	button: {
		marginTop: '1rem'
	}
});

class SimpleModal extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			description: '',
			urlError: '',
			descError: ''
		};
	}

	handleFormSubmit(){
		let err = validate({url: this.state.url, description: this.state.description});

		this.setState({
			url: '',
			description: '',
			...err
		});

		if(err.urlError.length === 0 && err.descError.length === 0 ){
			this.props.addPin({url: this.state.url, description: this.state.description});
			this.setState(
				{
					url: '',
					description: '',
					urlError: '',
					descError: ''
				}
			);
		}
	}

	handleURLChange(e){
		this.setState(
			{
				url: e.target.value
			}
		);
	}
	
	handleDescChange(e){
		this.setState(
			{
				description: e.target.value
			}
		);
	}	
	
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.props.show}
					onClose={this.props.closeAddModal}
				>
					<div style={getModalStyle()} className={classes.paper}>
						<div>
							<Tooltip  
								title = {this.state.urlError} 
								open = {this.state.urlError.length !== 0}
								placement="bottom"
							>
								<TextField
									label="URL"
									margin="normal"
									className={classes.textField}
									placeholder='Enter URL to Image'
									error={ this.state.urlError.length !== 0 }
									onChange={this.handleURLChange.bind(this) }
								/>
							</Tooltip>
						</div>			
						<div>
							<Tooltip  
								title = {this.state.descError} 
								open = {this.state.descError.length !== 0}
								placement="bottom"
							>
								<TextField
									label="Description"
									margin="normal"
									multiline
									className={classes.textField}
									placeholder='Enter Description'
									error={ this.state.descError.length !== 0 }
									onChange={this.handleDescChange.bind(this) }
								/>
							</Tooltip>
						</div>
						<Button 
							variant="raised"
							color="primary" 
							className={classes.button}
							onClick={this.handleFormSubmit.bind(this)}
						>
							Submit
						</Button>
					</div>
				</Modal>
			</div>	
		);
	}
}

const mapStateToProps = state => (
	{
		show: state.modal.addPinModal
	}
);

const mapDispatchToProps = {
	addPin,
	closeAddModal
};

SimpleModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

const validate = values => {
	const err = {
		urlError: '',
		descError: ''
	};

	if(values.url.length === 0){
		err.urlError = 'URL is required';
	}

	else if(validUrl.isHttpUri(values.url) || validUrl.isHttpsUri(values.url)){
		err.urlError = 'Invalid URL please enter right URL';
	}

	if(!values.description){
		err.descError = 'Please Enter Description';
	}
	else if(values.description.length > 40){
		err.descError = 'Description length should be less than 40 characters';
	}

	return err;
}; 

const addPinModal = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, mapDispatchToProps)(addPinModal);




/*

// We need an intermediary variable for handling the recursive nesting.
// const SimpleModalWrapped = withStyles(styles)(SimpleModal);


// const reduxModal = reduxForm({form: 'addPin'})(SimpleModal);

<form
	className={classes.container}
	onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
>
	<Field 
		name='url'
		placeholder="Enter URL to Image"
		validate={ [required, urlValid] }
		component = { 
			field =>
				<div>
					<Tooltip  
						title={
							field.meta.valid ?
								'Please Type':
								field.meta.error 				
						} 
						open = {
							field.meta.invalid &&
							field.meta.error.length > 0 
						}
						placement="bottom"
						disableTriggerFocus={true}
						disableTriggerTouch={true}
						disableTriggerHover={true}
					>
						<TextField
							label="URL"
							margin="normal"
							className={classes.textField}
							placeholder={ field.placeholder }
							error={ field.meta.invalid }
						>
							<Input 
								{...field.input}
							/>
						</TextField>
					</Tooltip>
				</div>
		}
	/>

	<Field 
		name='description'
		placeholder="Enter image description"
		validate={ [required, descValid] }
		component = {
			field =>
				<div>
					<Tooltip 
						title={
							field.meta.valid ?
								'Please Type':
								field.meta.error 				
						} 
						open = {
							field.meta.invalid &&
							field.meta.error.length > 0
						}
						placement="bottom"
						disableTriggerFocus={true}
						disableTriggerTouch={true}
						disableTriggerHover={true}
					>
						<TextField
							label="Description"
							multiline
							margin="normal"
							placeholder={ field.placeholder }
							className={classes.textField}
							error={ field.meta.invalid }
						>
							<Input
								{...field.input}
							/>
						</TextField>
					</Tooltip>
				</div>
		}
	/>
	<Button 
		variant="raised" 
		color="primary" 
		className={classes.button}
		type='submit'
	>
		Submit
	</Button>

</form>

*/