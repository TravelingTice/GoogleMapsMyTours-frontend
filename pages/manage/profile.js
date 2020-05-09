import { useState, useEffect } from "react";
import Router from 'next/router';
import Layout from '../../components/layout/Layout';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Message from '../../components/Message';
import { getUserForEdit, updateUser, getCookie, forgotPassword, isAuth } from '../../actions/auth';
import { Form, Container, Row, Col } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';

const ProfileUpdate = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  const token = getCookie('token');

  useEffect(() => {
    getUserForEdit(token).then(data => {
      if (data.error) {
        setLoading(false);
        setError(data.error);
      } else {
        setLoading(false);
        setUsername(data.username);
      }
    });
  }, []);

  const handleChange = name => e => {
    setError('');
    setUsername(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    window.scrollTo(0,0);

    updateUser({ username }, token).then(data => {
      if (data.error) {
        setLoading(false);
        setError(data.error);
      } else {
        setLoading(false);
        setSuccess(data.message);
      }
    });
  }

  const onUpdateEmail = () => {

  }

  const onUpdatePassword = () => {
    forgotPassword(isAuth().email).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(data.message);
      }
    })
  }

  const showLoading = () => loading && <Loading/>
  const showError = () => error && <Error content={error} />
  const showSuccess = () => success && <Message content={success} color='success' />

  const showForm = () => (
    <Form onSubmit={handleSubmit} className="mt-3">
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input id="username" onChange={handleChange('username')} value={username} />
        </FormControl>
      </FormGroup>

      <div className="mt-3">
        <Button color="primary" variant="outlined" type="submit">Update</Button>
      </div>
    </Form>
  )

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs="12" md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}}>
            <div className="my-4">
              <h2 className="mb-4">Update your details</h2>

              {showLoading()}
              {showError()}
              {showSuccess()}

              {!loading && showForm()}
            </div>

            <div className="my-5 d-flex justify-content-between">
              <Button onClick={onUpdatePassword} color="primary" variant="contained">Update password</Button>
            </div>

            <div className="my-5">
              <Button onClick={() => Router.push('/dashboard')} color="primary" variant="outlined">Back to dashboard</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default ProfileUpdate
