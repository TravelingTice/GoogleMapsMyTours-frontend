import Private from '../../../components/auth/Private';
import Layout from '../../../components/layout/Layout';
import { MapContextProvider } from '../../../contexts/MapContext';
import GoogleMap from '../../../components/manage/map/GoogleMap';
import MapMenu from '../../../components/manage/map/MapMenu';
import SelectedMarkerIconModal from '../../../components/manage/map/SelectedMarkerIconModal';
import InfoWindowModal from '../../../components/manage/map/InfoWindowModal';
import SavingPrompt from '../../../components/manage/map/SavingPrompt';
import LoadingPrompt from '../../../components/manage/map/LoadingPrompt';
import MapNameModal from '../../../components/manage/map/MapNameModal';
import MapNamePrompt from '../../../components/manage/map/MapNamePrompt';
import InstructionsPrompt from '../../../components/manage/map/InstructionsPrompt';
import MapMoreMenu from '../../../components/manage/map/MapMoreMenu';

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
