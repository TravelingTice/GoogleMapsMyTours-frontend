import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Private from '../components/auth/Private';
import Layout from '../components/layout/Layout';
import MapList from '../components/manage/dashboard/MapList';
import ShareModal from '../components/manage/dashboard/ShareModal';
import EmbedModal from '../components/manage/dashboard/EmbedModal';
import { DashboardContextProvider } from '../contexts/DashboardContext';

const Dashboard = () => {
  return (
    <DashboardContextProvider>
      <Private>
        <Layout>
          <Container fluid>
            <Row>
              <Col xs="12">
                <h1 className="my-4">Dashboard</h1>
                <MapList />
                <ShareModal />
                <EmbedModal />
              </Col>
            </Row>
          </Container>
        </Layout>
      </Private>
    </DashboardContextProvider>
  )
}

export default Dashboard;
