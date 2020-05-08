import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Message from '../components/Message';
import { forgotPassword } from '../actions/auth';
import { Container, Row, Col, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');

  const handleChange = e => {
    setError('')
    setEmail(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const data = await forgotPassword(email);

    setLoading(false);
    
    if (data.error) return setError(data.error);

    setMessage(data.message);
  }

  const showError = () => error && <Error content={error} />
  const showMessage = () => message && <Message content={message} color="success" />
  const showLoading = () => loading && <Loading/>

  const showForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="email">Enter email</InputLabel>
          <Input id="email" type="email" onChange={handleChange} value={email} />
        </FormControl>
      </FormGroup>

      <div className="mt-4">
        <Button color="primary" type="submit" variant="contained">Send</Button>
      </div>
    </Form>
  );

  return (
    <Layout>
      <Container>
        <Row>

          <Col xs="12" md={{size: 8, offset: 2}} lg={{size: 6, offset: 3}}>
            <div className="my-4">
              <h2>Forgot password</h2>
            </div>

            {showError()}
            {showMessage()}
            {showLoading()}

            {!message && showForm()}
          </Col>

        </Row>
      </Container>
    </Layout>
  )
}

export default ForgotPassword;