import Private from '../../../components/auth/Private';
import Layout from '../../../components/layout/Layout';
import { MapContextProvider } from '../../../contexts/MapContext';
import GoogleMap from '../../../components/map/GoogleMap';
import MapMenu from '../../../components/map/MapMenu';
import SelectedMarkerIconModal from '../../../components/map/SelectedMarkerIconModal';
import InfoWindowModal from '../../../components/map/InfoWindowModal';
import LineModal from '../../../components/map/LineModal';
import KmlModal from '../../../components/map/KmlModal';
import KmlManageModal from '../../../components/map/KmlManageModal';
import SavingPrompt from '../../../components/map/SavingPrompt';
import ErrorPrompt from '../../../components/map/ErrorPrompt';
import LoadingPrompt from '../../../components/map/LoadingPrompt';
import MapNamePrompt from '../../../components/map/MapNamePrompt';
import InstructionsPrompt from '../../../components/map/InstructionsPrompt';
import MapMoreMenu from '../../../components/map/MapMoreMenu';
import { withRouter } from 'next/router';

const MapsEdit = ({ router }) => {
  return (
    <Private>
      <MapContextProvider id={router.query.id}>
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh'}}>
          <Layout>
            <div style={{position: 'relative', height: '100%'}}>

              <GoogleMap />

              <InstructionsPrompt />
              <SavingPrompt />
              <ErrorPrompt />
              <LoadingPrompt />
              <MapNamePrompt />

              <MapMenu />
              <MapMoreMenu />

              <SelectedMarkerIconModal />
              <InfoWindowModal />
              <LineModal />
              <KmlModal />
              <KmlManageModal />
              
            </div>
          </Layout>
        </div>
      </MapContextProvider>
    </Private>
  )
}

export default withRouter(MapsEdit);
