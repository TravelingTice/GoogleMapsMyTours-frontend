import { useState, useEffect } from 'react';
import { isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import { Button } from '@material-ui/core';
import {
  Form,
} from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input } from '@material-ui/core';

import Loading from '../Loading';
import Error from '../Error';
import Message from '../Message';

const SignupComponent = () => {
  const [ values, setValues ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: '',
    loading: false,
    message: '',
  });

  const { username, email, password, passwordConfirmation, error, loading, message } = values;

  // redirect user when already signed in
  useEffect(() => {
    isAuth() && Router.push('/dashboard')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    // check if password confirmation is same as password
    if (password !== passwordConfirmation) return setValues({ ...values, error: 'Passwords don\'t match' });

    const user = { 
      username: username,
      email,
      password 
    };

    preSignup(user)
    .then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({...values,
          error: '',
          loading: false,
          message: data.message,
          showForm: false
        });
      }
    });
  }
  
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  }

  const showLoading = () => loading && <Loading/>;
  const showError = () => error && <Error content={error} />
  const showMessage = () => message && <Message color="success" content={message} />

  const signupForm = () => {
    return (
      <Form onSubmit={handleSubmit}>

        <FormGroup className="mt-2">
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="username" onChange={handleChange('username')} value={username} />
          </FormControl>
        </FormGroup>
        
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" type="email" onChange={handleChange('email')} value={email} />
          </FormControl>
        </FormGroup>

        <FormGroup className="mt-3">
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" onChange={handleChange('password')} value={password} />
          </FormControl>
        </FormGroup>

        <FormGroup className="mt-2">
          <FormControl>
            <InputLabel htmlFor="password-confirmation">Retype password</InputLabel>
            <Input id="password-confirmation" type="password" onChange={handleChange('passwordConfirmation')} value={passwordConfirmation} />
          </FormControl>
        </FormGroup>

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" variant="contained" color="primary">Sign up</Button>
        </div>

      </Form>
    )
  }
  return (
    <>
      <div className="mb-3">
        {showError()}
        {showLoading()}
        {showMessage()}
      </div>
      {!message && signupForm()}
    </>
  );
}

export default SignupComponent;