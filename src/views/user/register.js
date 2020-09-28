import React, { useEffect, useState } from 'react';

import {
  Row,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { withRouter } from 'react-router';

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const { error, loading } = useSelector(({ authUser }) => authUser);
  console.log('password', password);

  const initialValues = { name, email, password, passwordConf };

  const validateName = (value) => {
    let error = '';
    if (!value) {
      error = 'Name is required.';
    }
    return error;
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
      error = 'Password must be longer than 3 characters';
    } else {
      setPassword(value);
    }
    return error;
  };

  const validatePasswordConf = (value) => {
    console.log('password', password);
    let error = '';
    if (!value) {
      error = 'Please confirm your password.';
    } else if (value.length < 3) {
      error = 'Password must be longer than 3 characters';
    } else if (password !== value) {
      error = `Password doesn't match.`;
    }
    return error;
  };

  const onUserRegister = (values) => {
    dispatch(registerUser({ ...values }, history));
  };

  return (
    <Row className='h-100'>
      <Colxx xxs='12' md='10' className='mx-auto my-auto'>
        <Card className='auth-card'>
          <div className='form-side'>
            <CardTitle className='mb-4'>
              <IntlMessages id='user.register' />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form className='av-tooltip tooltip-label-bottom'>
                  <FormGroup className='form-group has-float-label'>
                    <Label>
                      <IntlMessages id='user.name' />
                    </Label>
                    <Field
                      className='form-control'
                      name='name'
                      validate={validateName}
                    />
                    {errors.name && touched.name && (
                      <div className='invalid-feedback d-block'>
                        {errors.name}
                      </div>
                    )}
                  </FormGroup>
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
                      name='password'
                      type='password'
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className='invalid-feedback d-block'>
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className='form-group has-float-label'>
                    <Label>
                      <IntlMessages id='user.passwordConf' />
                    </Label>
                    <Field
                      className='form-control'
                      name='passwordConf'
                      type='password'
                      validate={validatePasswordConf}
                    />
                    {errors.passwordConf && touched.passwordConf && (
                      <div className='invalid-feedback d-block'>
                        {errors.passwordConf}
                      </div>
                    )}
                  </FormGroup>
                  <div className='d-flex align-items-center justify-content-end'>
                    <Button
                      color='primary'
                      className={`mr-5 btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size='lg'
                    >
                      <span className='spinner d-inline-block'>
                        <span className='bounce1' />
                        <span className='bounce2' />
                        <span className='bounce3' />
                      </span>
                      <span className='label'>
                        <IntlMessages id='user.register-button' />
                      </span>
                    </Button>
                    <NavLink to={`/user/login`} className='white'>
                      <strong style={{ color: '#dd6c46' }}> Login </strong>
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
export default withRouter(Register);
