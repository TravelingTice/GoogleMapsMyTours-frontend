import { Container, Row, Col } from "reactstrap";
import { APP_NAME } from '../config';
import Layout from '../components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col xs="12">
            <div className="text-center my-5">
              <h1>{APP_NAME}</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Home;
