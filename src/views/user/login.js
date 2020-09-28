import React, { Component, useState } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { NotificationManager } from '../../components/common/react-notifications';
import { Formik, Form, Field } from 'formik';

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialValues = { email, password };

  const onUserLogin = (values) => {
    props.loginUser({ ...values }, props.history);
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your password';
    } else if (value.length < 3) {
      error = 'Value must be longer than 3 characters';
    }
    return error;
  };

  return (
    <Row className='h-100'>
      <Colxx xxs='12' md='10' className='mx-auto my-auto'>
        <Card className='auth-card'>
          <div className='form-side'>
            <CardTitle className='mb-4'>
              <IntlMessages id='user.login-title' />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className='av-tooltip tooltip-label-bottom'>
                  <FormGroup className='form-group has-float-label'>
                    <Label>
                      <IntlMessages id='user.email' />
                    </Label>
                    <Field
                      className='form-control'
                      name='email'
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className='invalid-feedback d-block'>
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className='form-group has-float-label'>
                    <Label>
                      <IntlMessages id='user.password' />
                    </Label>
                    <Field
                      className='form-control'
                      type='password'
                      name='password'
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className='invalid-feedback d-block'>
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  {props.error && (
                    <Row>
                      <Colxx xxs='12' className='mb-4'>
                        <span> {props.error} </span>
                      </Colxx>
                    </Row>
                  )}
                  <div className='d-flex justify-content-end align-items-center'>
                    <Button
                      color='primary'
                      className={`mr-5 btn-shadow btn-multiple-state ${
                        props.loading ? 'show-spinner' : ''
                      }`}
                      size='lg'
                    >
                      <span className='spinner d-inline-block'>
                        <span className='bounce1' />
                        <span className='bounce2' />
                        <span className='bounce3' />
                      </span>
                      <span className='label'>
                        <IntlMessages id='user.login-button' />
                      </span>
                    </Button>
                    <NavLink to={`/user/register`} className='white'>
                      <strong style={{ color: '#dd6c46' }}> Register </strong>
                    </NavLink>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { authID, role, loading, error } = authUser;
  return { authID, role, loading, error };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
