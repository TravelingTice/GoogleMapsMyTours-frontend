import { Container, Row, Col } from "reactstrap";
import { APP_NAME } from '../config';
import Layout from '../components/layout/Layout';
import { useState, useEffect } from "react";
import { Motion, spring } from 'react-motion';

const Home = () => {
  const [step, setStep] = useState(0);

  const incrementStep = () => setStep(step + 1);

  useEffect(() => {
    setTimeout(incrementStep, 1000);
  }, []);

  const showSubtitle = () => {
    const appear = step >= 1;

    const opacity = appear ? 1 : 0;
    const right = appear ? 0 : -20;
    return <Motion style={{opacity: spring(opacity), right: spring(right)}}>{({ opacity, right }) =>
      <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: 40}}>
        <div style={{position: 'absolute', opacity, right, width: '100%' }}>
          <p className="text-center">Create your own maps like these: </p>
        </div>
      </div>
    }</Motion>
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs="12">
            <div className="text-center my-5">
              <h1>{APP_NAME}</h1>
            </div>
          </Col>

          <Col xs="12">
            {showSubtitle()}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Home;
