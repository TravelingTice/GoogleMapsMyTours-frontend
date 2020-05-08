import { useState, useEffect } from 'react';
import { isAuth, signin, authenticate } from '../../actions/auth';
import Router from 'next/router';
import { Button, FormGroup, FormControl, Input, InputLabel } from '@material-ui/core';
import { Form } from 'reactstrap';
import Loading from '../Loading';
import Error from '../Error';
import Message from '../Message';

const SigninComponent = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ values, setValues ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = values;

  // redirect user when already signed in
  useEffect(() => {
    isAuth() && Router.push('/')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
        setLoading(false);
        setError(data.error);
        setValues
      } else {
        // authenticate the user
        authenticate(data, () => {
          Router.push('/dashboard');
        });
      }
    });
  }
  
  const handleChange = name => e => {
    setError(false);
    setValues({ ...values, [name]: e.target.value });
  }

  const showLoading = () => loading && <Loading/>;
  const showError = () => error && <Error content={error} />;
  const showMessage = () => message && <Message color="success" content={message} />

  const signinForm = () => {
    return (
      <Form onSubmit={handleSubmit}>

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

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" variant="contained" color="primary">Sign in</Button>
        </div>

      </Form>
    )
  }
  return (
    <>
      <div className="mb-4">
        {showError()}
        {showLoading()}
        {showMessage()}
      </div>
      {!message && signinForm()}
    </>
  );
}

export default SigninComponent;