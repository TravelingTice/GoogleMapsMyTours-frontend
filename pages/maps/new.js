import Private from '../../components/auth/Private';
import Layout from '../../components/layout/Layout';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapsNew = () => {
  return (
    <Private>
      <Layout>

      </Layout>
    </Private>
  )
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapsNew)
