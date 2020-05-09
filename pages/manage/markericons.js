import { useContext } from 'react';
import { Container, Row, Col } from "reactstrap";
import Private from '../../components/auth/Private';
import Layout from '../../components/layout/Layout';
import MarkerIconList from '../../components/manage/markericons/MarkerIconList';
import PlusIcon from '../../components/PlusIcon';
import { MarkerIconContextProvider, MarkerIconContext } from '../../contexts/MarkerIconContext';

const AddMarkerIcon = () => {
  const { openModal } = useContext(MarkerIconContext);
  return (
    <PlusIcon onClick={openModal} />
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
              </Col>
            </Row>
          </Container>
        </Layout>

        <AddMarkerIcon />

      </MarkerIconContextProvider>
    </Private>
  )
}

export default MarkerIcons;
