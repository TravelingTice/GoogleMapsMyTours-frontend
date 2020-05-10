import Private from '../../components/auth/Private';
import Layout from '../../components/layout/Layout';
import { MapContextProvider } from '../../contexts/MapContext';
import GoogleMap from '../../components/map/GoogleMap';
import MapMenu from '../../components/map/MapMenu';
import SelectedMarkerIconModal from '../../components/map/SelectedMarkerIconModal';

const MapsNew = ({ google }) => {
  return (
    <Private>
      <MapContextProvider>
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh'}}>
          <Layout>
            <div style={{position: 'relative', height: '100%'}}>

              <GoogleMap />
              <MapMenu />
              <SelectedMarkerIconModal />


            </div>
          </Layout>
        </div>
      </MapContextProvider>
    </Private>
  )
}

export default MapsNew;
