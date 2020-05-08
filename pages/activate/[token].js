import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Layout from '../../components/layout/Layout';
import Router, { withRouter } from 'next/router';
import { signup } from '../../actions/auth';
import Error from '../../components/Error';

const Activate = ( { router }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.query.token) {
      signup(router.query.token).then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          Router.replace(`/signin?message=${data.message}`);
        }
      })
    }
  }, [router]);

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs="12" md={{size: 8, offset: 2}}>
            {!error ? (
              <h1 className="my-5">Hold still...</h1>
            ) : (
              <div className="my-5">
                <Error content={error} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default withRouter(Activate);
