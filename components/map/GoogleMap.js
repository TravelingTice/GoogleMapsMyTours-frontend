import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useState, useContext } from 'react';
import { MapContext } from '../../contexts/MapContext';
import { Container, Row, Col } from 'reactstrap';
import { cloudinaryCore } from '../../config';

const GoogleMap = ({ google }) => {
  const { state, selectedMarkerIcon, setMenu, onAddMarker, markers, findMarkerIconById } = useContext(MapContext);

  const handleClickMap = (t, map, coord) => {
    // just to be sure, make sure the menu is collapsed
    setMenu(false);
    // handle click for when state = marker
    if (state === 'newMarker') {
      onAddMarker(coord);
    }

  }

  console.log('ya')

  const showMap = () => (
    <Map 
      google={google} 
      initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
      zoom={2}
      disableDefaultUI={true}
      onClick={handleClickMap}>
        {markers.map(marker => (
          <Marker 
            name='New marker'
            position={{lat: marker.lat, lng: marker.lng }}
            icon={{
              url: cloudinaryCore.url(findMarkerIconById(marker.markerIconId).image, {height: 50, crop: 'fill'}),
              scaledSize: new google.maps.Size(20,32),
              anchor: new google.maps.Point(10,16)
            }}
            />
        ))}
    </Map>
  );

  const showAddMarkerPrompt = () => (
    <Container>
      <Row>
        <Col xs="12" className="mt-4 text-center text-white">
          <div style={{backgroundColor: 'rgba(0,0,0,.5)', borderRadius: 5, padding: 5}}>
            <p className="m-0">Click anywhere on the map to drop the marker</p>
          </div>
        </Col>
      </Row>
    </Container>
  )

  return (
    <>
     {showMap()}
     {state === 'newMarker' && selectedMarkerIcon && showAddMarkerPrompt()}
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(GoogleMap)
