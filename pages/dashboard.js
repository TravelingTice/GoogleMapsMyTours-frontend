import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Private from '../components/auth/Private';
import Layout from '../components/layout/Layout';
import MapList from '../components/manage/maps/MapList';

const Dashboard = () => {
  return (
    <Private>
      <Layout>
        <Container fluid>
          <Row>
            <Col xs="12">
              <h1 className="my-4">Dashboard</h1>
              <MapList />
            </Col>
          </Row>
        </Container>
      </Layout>
    </Private>
  )
}

export default Dashboard;
