import Router, { withRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Form, Container, Row, Col } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { resetPassword } from '../actions/auth';

const ResetPassword = ({ router }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [values, setValues] = useState({
    password: '',
    passwordConfirmation: ''
  });

  const { password, passwordConfirmation } = values;

  const handleChange = name => e => {
    setError('');
    setValues({ ...values, [name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) return setError('Passwords are not the same');

    setLoading(true);

    const token = router.query.token;

    const data = await resetPassword(password, token)
    
    if (data.error) {
      setLoading(false);
      setError(data.error);
      return;
    }
      
    Router.push(`/signin?message=${data.message}`)
  }

  const showLoading = () => loading && <Loading/>
  const showError = () => error && <Error content={error} />

  const showForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="password">New password</InputLabel>
          <Input id="password" type="password" onChange={handleChange('password')} value={password} />
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="passwordCon">Retype password</InputLabel>
          <Input id="passwordCon" type="password" onChange={handleChange('passwordConfirmation')} value={passwordConfirmation} />
        </FormControl>
      </FormGroup>

      <div className="mt-4">
        <Button color="primary" type="submit" variant="contained">Update</Button>
      </div>
    </Form>
  )
  return (
    <Layout>
      <Container>
        <Row>
          <Col xs="12" md={{size: 8, offset: 2}} lg={{size: 6, offset: 3}}>
            <h2 className="my-4">Reset your password</h2>

            {showLoading()}
            {showError()}

            <div className="my-5">
              {showForm()}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default withRouter(ResetPassword);
