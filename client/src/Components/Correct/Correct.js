import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { red, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const MySnackbarContentWrapper = (props) => {
  const classes = useStyles1();
  const { className, message, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));





const Correct = ({ correct, handleClose, openCorrect, openWrong, handleCloseSnackbar}) => {

  const classes = useStyles2();


  return (
    <>
    {
      openCorrect &&
      <Snackbar
        open={openCorrect}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        autoHideDuration={2000}
      >

        <MySnackbarContentWrapper
          variant="success"
          message="You Are Doing Good, Friend!"
        />
      </Snackbar>
    }
    {
       openWrong &&
      
        <Snackbar
        open={openWrong}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        autoHideDuration={1000||null}
      >

        <MySnackbarContentWrapper
          variant="error"
          message="You Have A Terrible Memory, Buddy!"
        />
      </Snackbar>
      

}

    </>
  )
}

export default Correct