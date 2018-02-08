import React from 'react'
import PropTypes from 'prop-types'

import {withStyles} from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import TextField from 'material-ui/TextField';

import { Link } from 'react-router-dom';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
  backgroundColor: theme.palette.background.paper,
	width: '35%',
	position: 'absolute',
	top: '50%',
	left: '50%',
	margin: '-20% 0 0 -20%'
  },

  button: {
    margin: theme.spacing.unit,
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Login" />
            <Tab label="Signup" />  
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <TextField
              id="name"
              label="Username"
              className={classes.textField}
              value={this.state.name}
              margin="normal"
              style={{width:'100%'}}
            />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            Item Two
          </TabContainer>          
        </SwipeableViews>
        <Button 
          variant="fab" 
          color="primary" 
          aria-label="Arrow Left" 
          component={ Link }
          to='/'
          style={{ marginLeft:"80%" }}
        >
          <ArrowLeft />
        </Button>

      </div> 
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
