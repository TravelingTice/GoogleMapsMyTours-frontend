import Layout from "../components/layout/Layout"
import SigninComponent from "../components/auth/SigninComponent"
import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from "next/router";
import Message from '../components/Message';
import { useState, useEffect } from "react";

const Signin = ({ router }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (router.query.message) {
      setMessage(router.query.message);
      setTimeout(() => setMessage(''), 2000);
    };
  }, [router])

  const showMessage = () => (
    message && <Message content={message} color='success' />
  )

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
            <div className="mt-3">
              {showMessage()}
            </div>

            <h2 className="text-center my-4">Sign in</h2>

            <SigninComponent/>

            <div className="mt-4">
              <Link href="/forgot-password"><a style={{opacity: 0.8}}>Forgot password?</a></Link>
            </div>

            <div className="mt-5" style={{opacity: 0.8}}>
              <p className="mb-2">No account?</p>
              <Link href="/signup"><a>Sign up</a></Link>
            </div>
            
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default withRouter(Signin);