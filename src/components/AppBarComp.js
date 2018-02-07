import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

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

function SimpleAppBar(props) {
  const { classes } = props;
  
  return (
 	 <div className={classes.root}>
      <AppBar position="static" color= 'primary'>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Pinterest Clone
          </Typography>
		      <Button
            component={ Link }
            to='/login'  
            color="inherit"
          >
            Login
            
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
