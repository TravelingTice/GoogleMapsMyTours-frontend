import Private from '../../../components/auth/Private';
import Layout from '../../../components/layout/Layout';
import { MapContextProvider } from '../../../contexts/MapContext';
import GoogleMap from '../../../components/map/GoogleMap';
import MapMenu from '../../../components/map/MapMenu';
import SelectedMarkerIconModal from '../../../components/map/SelectedMarkerIconModal';
import InfoWindowModal from '../../../components/map/InfoWindowModal';
import SavingPrompt from '../../../components/map/SavingPrompt';
import LoadingPrompt from '../../../components/map/LoadingPrompt';
import MapNameModal from '../../../components/map/MapNameModal';
import MapNamePrompt from '../../../components/map/MapNamePrompt';
import InstructionsPrompt from '../../../components/map/InstructionsPrompt';
import MapMoreMenu from '../../../components/map/MapMoreMenu';

const MapsNew = () => {
  return (
    <Private>
      <MapContextProvider>
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh'}}>
          <Layout>
            <div style={{position: 'relative', height: '100%'}}>

              <GoogleMap />
              <InstructionsPrompt />
              <MapMenu />
              <MapMoreMenu />
              <SelectedMarkerIconModal />
              <InfoWindowModal />
              <SavingPrompt />
              <LoadingPrompt />
              <MapNamePrompt />
              <MapNameModal />

            </div>
          </Layout>
        </div>
      </MapContextProvider>
    </Private>
  )
}

export default MapsNew;
