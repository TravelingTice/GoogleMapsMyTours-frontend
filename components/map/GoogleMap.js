import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useState, useContext } from 'react';
import { MapContext } from '../../contexts/MapContext';
import { Container, Row, Col } from 'reactstrap';

const GoogleMap = ({ google }) => {
  const { state, selectedMarkerIcon } = useContext(MapContext);

  const handleClickMap = (t, map, coord) => {
    console.log(coord.latLng.lat());
  }

  const showMap = () => (
    <Map 
      google={google} 
      initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
      zoom={2}
      disableDefaultUI={true}
      onClick={handleClickMap}>
    </Map>
  );

  const showAddMarkerPrompt = () => (
    <Container>
      <Row>
        <Col xs="12">
          <div style={{height: 20, width: 20, backgroundColor: 'rgba(0,0,0,.2)'}}></div>
        
        </Col>
      </Row>
    </Container>
  )

  return (
    <>
     {showMap()}
     {state === 'marker' && selectedMarkerIcon && showAddMarkerPrompt()}
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(GoogleMap)
