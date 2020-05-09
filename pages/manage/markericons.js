import { Container, Row, Col } from "reactstrap";
import Private from '../../components/auth/Private';
import Layout from '../../components/layout/Layout';
import PlusIcon from '../../components/PlusIcon';
import { MarkerIconContextProvider } from '../../contexts/MarkerIconContext';

const AddMarkerIcon = () => {
  return (
    <PlusIcon />
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
                <MarkerCreateUpdate />
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
