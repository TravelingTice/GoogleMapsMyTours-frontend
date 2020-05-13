import { useContext } from 'react';
import { Container, Row, Col } from "reactstrap";
import Private from '../../components/auth/Private';
import Layout from '../../components/layout/Layout';
import MarkerIconList from '../../components/manage/markericons/MarkerIconList';
import MarkerCrudModal from '../../components/manage/markericons/MarkerCrudModal';
import PlusIcon from '../../components/PlusIcon';
import { MarkerIconContextProvider, MarkerIconContext } from '../../contexts/MarkerIconContext';
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Router from 'next/router';

const AddMarkerIcon = () => {
  const { initNew } = useContext(MarkerIconContext);
  return (
    <PlusIcon onClick={initNew} />
  )
}

const MarkerIcons = () => {
  return (
    <Private>
      <MarkerIconContextProvider>
        <Layout>
          <Container fluid>
            <Row>
              <Col xs="12">
                <h1 className="my-4">My Markers</h1>
              </Col>

              <Col xs="12">
                <MarkerIconList />

                <div className="my-5">
                  <Button color="primary" role="link" onClick={() => Router.push('/dashboard')} variant="outlined" startIcon={<ArrowBackIosIcon/>}>Back to dashboard</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Layout>

        <MarkerCrudModal />

        <AddMarkerIcon />

      </MarkerIconContextProvider>
    </Private>
  )
}

export default MarkerIcons;
