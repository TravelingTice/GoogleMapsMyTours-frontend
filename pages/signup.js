import Layout from "../components/layout/Layout"
import SignupComponent from "../components/auth/SignupComponent"
import Link from 'next/link';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

const Signup = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
            <h2 className="text-center mt-5 mb-4">Sign up</h2>
            <SignupComponent />
            <div className="mt-5" style={{ opacity: 0.8 }}>
              <p className="mb-2 ">Already have an account?</p>
              <Link href="/signin"><a>Sign in</a></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup;