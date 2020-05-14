import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useState, useEffect, useRef } from 'react';
import { cloudinaryCore } from '../../config';
import moment from 'moment';
import { withRouter } from 'next/router';
import { getMap } from '../../actions/map';
import Error from '../../components/Error';
import Layout from '../../components/layout/Layout';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  margin-top: 7px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr auto;
    .right-panel {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
`;

const MapShow = ({ google, id }) => {
  const [markers, setMarkers] = useState([]);
  const [lines, setLines] = useState([]);
  const [kmls, setKmls] = useState([]);
  const [error, setError] = useState('');
  const [bounds, setBounds] = useState('');
  const [activeGoogleMarker, setActiveGoogleMarker] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isInfoWindow, setInfoWindow] = useState(false);

  let mapRef = useRef(null);

  useEffect(() => {
    fetchMapData();
  }, [id]);

  useEffect(() => {
    // render the kmls as layers on the map
    if (kmls.length > 0) {
      kmls.forEach(({ name }) => {
        let src = `https://res.cloudinary.com/ticekralt/raw/upload/${name}`
        let kmlLayer = new google.maps.KmlLayer(src, {
          suppressInfoWindows: true,
          preserveViewport: true,
          map: mapRef.map
        });
      })
    }
  }, [kmls]);

  const fetchMapData = async () => {
    if (id) {
      const data = await getMap(id);

      if (data.error) return setError(data.error);

      const { markers, mapName, lines, kmls } = data;

      setMarkers(markers);
      setLines(lines);
      setKmls(kmls);

      // extend the bounds to the map markers
      const bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < markers.length; i++) {
        bounds.extend(markers[i]);
      }

      setBounds(bounds);
    }
  }

  const handleClickMap = (t, map, coord) => setInfoWindow(false);

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
        key={marker.id}
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

        <Grid>
          <div className="left-panel">
            <p>{infoWindow.body}</p>
          </div>

          <div className="right-panel">
            {isYoutube && (
              <iframe width="200" height="130" src={`https://www.youtube.com/embed/${infoWindow.youtube}`}></iframe>
            )}

            {isImage && (
              <img src={cloudinaryCore.url(infoWindow.image, { height: 400, crop: 'fill' })} alt={infoWindow.title} height="130" />
            )}
          </div>

        </Grid>
      </div>
    )
  }

  const showLines = () => lines.map(line => {
    const { strokeColor, strokeWeight, strokeOpacity, coords } = line;
    return (
      <Polyline
        key={line.id}
        path={coords}
        strokeColor={strokeColor}
        strokeWeight={strokeWeight}
        strokeOpacity={parseFloat(strokeOpacity)} />
    )});

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
        ref={(map) => mapRef = map}
        google={google} 
        initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
        bounds={bounds}
        disableDefaultUI={true}
        onClick={handleClickMap}>

          {showMarkers()}
          {showLines()}
          {showInfoWindow()}

      </Map>
    </div>
  ) : <Layout><Error content={error} /></Layout>
}


export default withRouter(GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapShow))
