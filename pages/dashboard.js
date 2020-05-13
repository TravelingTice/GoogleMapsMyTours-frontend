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
import RoomIcon from '@material-ui/icons/Room';
import Router from 'next/router';

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
                <div className="my-4 d-flex align-items-center justify-content-between">
                  <h1 className="m-0">Dashboard</h1>
                  <Button variant="outlined" color="primary" startIcon={<RoomIcon />} role="link" onClick={() => Router.push('/manage/markericons')}>Manage markers</Button>
                </div>
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
