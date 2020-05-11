import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useContext, useState } from 'react';
import { MapContext } from '../../contexts/MapContext';
import { Container, Row, Col } from 'reactstrap';
import { cloudinaryCore } from '../../config';
import { Image, Transformation } from 'cloudinary-react';
import moment from 'moment';

const GoogleMap = ({ google }) => {
  const { state, selectedMarkerIcon, setMenu, onAddMarker, markers, findMarkerIconById, findInfoWindowByMarkerRefId, findMarkerByRefId } = useContext(MapContext);
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeMarkerRefId, setActiveMarkerRefId] = useState('');
  const [isInfoWindow, setInfoWindow] = useState(false);

  const handleClickMap = (t, map, coord) => {
    // just to be sure, make sure the menu is collapsed
    setMenu(false);
    // handle click for when state = marker
    if (state === 'newMarker') {
      onAddMarker(coord);
    }
  }

  const onMarkerClick = refId => (props, marker, e) => {
    setActiveMarkerRefId(refId);
    setActiveMarker(marker);
    setInfoWindow(true);
  }

  const showMarkers = () => markers.map(({ markerIconId, lat, lng, refId }) => {
    const { image, width, height, anchor } = findMarkerIconById(markerIconId);
    const anchorX = width / 2;
    const anchorY = anchor === 'bottom' ? height : height / 2;

    return (
      <Marker 
        name='New marker'
        position={{ lat, lng }}
        onClick={onMarkerClick(refId)}
        icon={{
          url: cloudinaryCore.url(image, { height: 100, crop: 'fill' }),
          scaledSize: new google.maps.Size(width, height),
          anchor: new google.maps.Point(anchorX, anchorY)
        }}/>
    )
  });

  const showInfoWindowContent = (info) => {
    const marker = findMarkerByRefId(activeMarkerRefId);
    const markerIcon = findMarkerIconById(marker.markerIconId);
    const isImage = info.option === 'image' && info.image;
    const isYoutube = info.option === 'youtube' && info.youtube;

    return (
      <div className="infowindow">
        <div className="d-flex align-items-center">
          <img src={cloudinaryCore.url(markerIcon.image, { height: 100, crop: 'fill' })} alt="yo" height="25" className="mr-2" />
          <h4 className="m-0">{info.title}</h4>
        </div>
        <div className="mt-3 pb-2 border-bottom">{moment(info.date).format('DD MMMM YYYY')}</div>
        <div className="mt-2">
          <p>{info.body}</p>
        </div>

        {isYoutube && (
          <iframe width="200" height="130" src={`https://www.youtube.com/embed/${info.youtube}`}></iframe>
        )}

        {isImage && (
          <img src={cloudinaryCore.url(markerIcon.image, { height: 400, crop: 'fill' })} alt={info.title} height="130"/>
        )}
      </div>
    )
  }

  const showInfoWindow = () => {
    const info = findInfoWindowByMarkerRefId(activeMarkerRefId);
    return (
      <InfoWindow
        marker={activeMarker}
        visible={isInfoWindow}>
          {info && showInfoWindowContent(info)}
      </InfoWindow>
    )
  }

  const showMap = () => (
    <Map 
      google={google} 
      initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
      zoom={2}
      disableDefaultUI={true}
      onClick={handleClickMap}>

        {showMarkers()}
        {showInfoWindow()}

    </Map>
  );

  const showAddMarkerPrompt = () => (
    <Container>
      <Row>
        <Col xs="12" className="mt-5 text-center text-white">
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
