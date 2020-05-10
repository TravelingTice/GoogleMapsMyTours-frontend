import Private from '../../components/auth/Private';
import Layout from '../../components/layout/Layout';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useState } from 'react';
import { Motion, spring } from 'react-motion';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import TimelineIcon from '@material-ui/icons/Timeline';
import CodeIcon from '@material-ui/icons/Code';

const MapsNew = ({ google }) => {
  const [plusIconAppear, setPlusIcon] = useState(false);
  const [isMenu, setMenu] = useState(false);

  const { palette } = useTheme();

  const handleClickMap = (t, map, coord) => {
    // get location of lat and lng of click event
    
    console.log(coord.latLng.lat());
  }

  const enablePlusIcon = () => setTimeout(() => setPlusIcon(true), 500);

  const toggleMenu = () => setMenu(!isMenu);

  const showOptions = () => {
    return (
      <>
      <Button startIcon={<RoomIcon/>} className="mb-2" color="primary" variant="contained">Marker</Button> 
      <Button startIcon={<TimelineIcon/>} className="mb-2" color="primary" variant="contained">Line</Button> 
      <Button startIcon={<CodeIcon/>} color="primary" variant="contained">KML</Button> 
      </>
    )
  }
  
  const showPlusIcon = () => {
    const opacity = plusIconAppear ? 1 : 0;
    const right = plusIconAppear ? -3 : -10;
    return (
      <Motion style={{opacity: spring(opacity), right: spring(right)}}>{({opacity, right})=>
        <button style={{justifySelf: 'end', marginTop: 10, position: 'relative', opacity, right, width: 60, height: 60, backgroundColor: 'white', borderRadius: '50%', border: 'none', boxShadow: '1px 1px 5px rgba(0,0,0,.3)'}}>
          <AddRoundedIcon fontSize='large' style={{ color: palette.primary.main }} />
        </button>
      }</Motion>
    )
  }

  const showMenu = () => {
    return (
      <div style={{position: 'absolute', bottom: 10, right: 0}}>
        <div style={{position: 'relative', overflow: 'hidden', padding: 10, display: 'grid'}}>
          {showOptions()}
          {showPlusIcon()}
        </div>
      </div>
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
              disableDefaultUI={true}
              onClick={handleClickMap}>
            </Map>

            {/* {showMenu()} */}
          </div>
        </Layout>
      </div>
    </Private>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapsNew)
