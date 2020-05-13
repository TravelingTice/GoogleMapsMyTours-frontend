import Private from '../../../components/auth/Private';
import Layout from '../../../components/layout/Layout';
import { MapContextProvider } from '../../../contexts/MapContext';
import GoogleMap from '../../../components/manage/map/GoogleMap';
import MapMenu from '../../../components/manage/map/MapMenu';
import SelectedMarkerIconModal from '../../../components/manage/map/SelectedMarkerIconModal';
import InfoWindowModal from '../../../components/manage/map/InfoWindowModal';
import LineModal from '../../../components/manage/map/LineModal';
import KmlModal from '../../../components/manage/map/KmlModal';
import KmlManageModal from '../../../components/manage/map/KmlManageModal';
import SavingPrompt from '../../../components/manage/map/SavingPrompt';
import ErrorPrompt from '../../../components/manage/map/ErrorPrompt';
import LoadingPrompt from '../../../components/manage/map/LoadingPrompt';
import MapNamePrompt from '../../../components/manage/map/MapNamePrompt';
import InstructionsPrompt from '../../../components/manage/map/InstructionsPrompt';
import MapMoreMenu from '../../../components/manage/map/MapMoreMenu';
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
