import React, { Component, Fragment, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CLIENT_ACCEPT_INVITATION, LOGOUT_USER } from '../../redux/actions';
import { NotificationManager } from 'react-notifications';

const Invite = (props) => {
  const dispatch = useDispatch();

  const { history, authUser, trainerApp } = props;
  const { error, errorMsg } = trainerApp;

  useEffect(() => {
    console.log('errorMsg', errorMsg);
    console.log('error', error);
    if (errorMsg) {
      if (error) {
        NotificationManager.error(errorMsg, 'Error');
      } else {
        NotificationManager.success(errorMsg, 'Success');
      }
    }
  }, [errorMsg, error]);

  return <Fragment>{error}</Fragment>;
};

const mapStateToProps = ({ authUser, trainerApp }) => {
  return { authUser, trainerApp };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Invite);
