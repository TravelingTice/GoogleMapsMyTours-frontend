import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Private from '../components/auth/Private';
import Layout from '../components/layout/Layout';
import MapList from '../components/manage/dashboard/MapList';
import ShareModal from '../components/manage/dashboard/ShareModal';
import EmbedModal from '../components/manage/dashboard/EmbedModal';
import ApiKeyModal from '../components/manage/dashboard/ApiKeyModal';
import { DashboardContextProvider, DashboardContext } from '../contexts/DashboardContext';
import { Button } from '@material-ui/core';

const ApiKeyBtn = () => {
  const { setApiKeyModal } = useContext(DashboardContext);

  return <Button onClick={() => setApiKeyModal(true)} color="primary" variant="outlined">Manage API keys</Button>
}

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
                <ApiKeyModal />
                <div className="my-5">
                  <ApiKeyBtn />
                </div>
              </Col>
            </Row>
          </Container>
        </Layout>
      </Private>
    </DashboardContextProvider>
  )
}

export default Dashboard;
