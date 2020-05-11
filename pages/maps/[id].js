import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useState, useEffect } from 'react';
import { cloudinaryCore } from '../../config';
import moment from 'moment';
import { withRouter } from 'next/router';
import { getMap } from '../../actions/map';

const MapShow = ({ google, router }) => {
  const [markers, setMarkers] = useState([]);
  const [activeGoogleMarker, setActiveGoogleMarker] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isInfoWindow, setInfoWindow] = useState(false);

  useEffect(() => {
    fetchMapData();
  }, [router.query.id]);

  const fetchMapData = async () => {
    if (router.query.id) {
      const { markers } = await getMap(id);
      setMarkers(markers);
    }
  }

  const handleClickMap = (t, map, coord) => {
    // just to be sure, make sure the menu is collapsed
    setMenu(false);
    // handle click for when state = marker
    if (state === 'newMarker') {
      onAddMarker(coord);
    }
  }

  const onMarkerClick = marker => (props, googleMarker, e) => {
    setActiveMarker(marker);
    setActiveGoogleMarker(googleMarker);
    setInfoWindow(true);
  }

  const showMarkers = () => markers.map(marker => {
    const { markerIconId, lat, lng, refId } = marker;
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
    return (
      <InfoWindow
        marker={activeMarker}
        visible={isInfoWindow}>
          {/* {info && showInfoWindowContent(info)} */}
          <div>test</div>
      </InfoWindow>
    )
  }

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <Map 
        google={google} 
        initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
        zoom={2}
        disableDefaultUI={true}
        onClick={handleClickMap}>

          {showMarkers()}
          {showInfoWindow()}

      </Map>
    </div>
  )
}

export default withRouter(GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapShow))
