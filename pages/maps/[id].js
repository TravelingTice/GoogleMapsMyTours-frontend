import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useState, useEffect } from 'react';
import { cloudinaryCore } from '../../config';
import moment from 'moment';
import { withRouter } from 'next/router';
import { getMap } from '../../actions/map';
import Error from '../../components/Error';
import Layout from '../../components/layout/Layout';

const MapShow = ({ google, router }) => {
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState('');
  const [activeGoogleMarker, setActiveGoogleMarker] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isInfoWindow, setInfoWindow] = useState(false);

  useEffect(() => {
    fetchMapData();
  }, [router.query.id]);

  const fetchMapData = async () => {
    if (router.query.id) {
      const data = await getMap(router.query.id);

      if (data.error) return setError(data.error);

      setMarkers(data.markers);

      document.title = data.mapName
    }
  }

  const handleClickMap = (t, map, coord) => {
    setInfoWindow(false);
  }

  const onMarkerClick = marker => (props, googleMarker, e) => {
    if (activeMarker === marker) {
      setInfoWindow(false);
    } else {
      setActiveMarker(marker);
      setActiveGoogleMarker(googleMarker);
      setInfoWindow(true);
    }
  }

  const showMarkers = () => markers.map(marker => {
    const { lat, lng } = marker;
    const { image, width, height, anchor } = marker.markerIcon;
    const anchorX = width / 2;
    const anchorY = anchor === 'bottom' ? height : height / 2;

    return (
      <Marker 
        name='New marker'
        position={{ lat, lng }}
        onClick={onMarkerClick(marker)}
        icon={{
          url: cloudinaryCore.url(image, { height: 100, crop: 'fill' }),
          scaledSize: new google.maps.Size(width, height),
          anchor: new google.maps.Point(anchorX, anchorY)
        }}/>
    )
  });

  const showInfoWindowContent = ({ infoWindow, markerIcon }) => {
    const isImage = infoWindow.option === 'image' && infoWindow.image;
    const isYoutube = infoWindow.option === 'youtube' && infoWindow.youtube;

    return (
      <div className="infowindow">
        <div className="d-flex align-items-center">
          <img src={cloudinaryCore.url(markerIcon.image, { height: 100, crop: 'fill' })} alt='' height="25" className="mr-2" />
          <h4 className="m-0">{infoWindow.title}</h4>
        </div>
        <div className="mt-3 pb-2 border-bottom">{moment(infoWindow.date).format('DD MMMM YYYY')}</div>
        <div className="mt-2">
          <p>{infoWindow.body}</p>
        </div>

        {isYoutube && (
          <iframe width="200" height="130" src={`https://www.youtube.com/embed/${infoWindow.youtube}`}></iframe>
        )}

        {isImage && (
          <img src={cloudinaryCore.url(markerIcon.image, { height: 400, crop: 'fill' })} alt={infoWindow.title} height="130"/>
        )}
      </div>
    )
  }

  const showInfoWindow = () => {
    return (
      <InfoWindow
        marker={activeGoogleMarker}
        visible={isInfoWindow}>
          {activeMarker && showInfoWindowContent(activeMarker)}
      </InfoWindow>
    )
  }

  return !error ? (
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
  ) : <Layout><Error content={error} /></Layout>
}

export default withRouter(GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapShow))
