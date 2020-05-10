import Private from '../../components/auth/Private';
import Layout from '../../components/layout/Layout';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useState } from 'react';
import { Motion, spring } from 'react-motion';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useTheme } from '@material-ui/core/styles';

const MapsNew = ({ google }) => {
  const [plusIconAppear, setPlusIcon] = useState(false);
  const { palette } = useTheme();

  const enablePlusIcon = () => setTimeout(() => setPlusIcon(true), 500);

  const showMenu = () => {
    return (
      <div style={{position: 'absolute', bottom: 10, right: 0}}>
        <div style={{position: 'relative', overflow: 'hidden', padding: 10}}>
          {showPlusIcon()}
        </div>
      </div>
    )
  }

  const showPlusIcon = () => {
    const opacity = plusIconAppear ? 1 : 0;
    const marginRight = plusIconAppear ? 0 : -5;
    return (
      <Motion style={{opacity: spring(opacity), marginRight: spring(marginRight)}}>{({opacity, marginRight})=>
        <button style={{opacity, marginRight, width: 60, height: 60, backgroundColor: 'white', borderRadius: '50%', border: 'none', boxShadow: '1px 1px 5px rgba(0,0,0,.3)'}}>
          <AddRoundedIcon fontSize='large' style={{ color: palette.primary.main }} />
        </button>
      }</Motion>
    )
  }

  return (
    <Private>
      <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh'}}>
        <Layout>
          <div style={{position: 'relative', height: '100%'}}>
            <Map 
              google={google} 
              initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
              zoom={2}
              onReady={enablePlusIcon}
              disableDefaultUI={true}>
            </Map>

            {showMenu()}
          </div>
        </Layout>
      </div>
    </Private>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapsNew)
