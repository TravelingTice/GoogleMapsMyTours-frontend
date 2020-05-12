import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../config';
import { useContext } from 'react';
import { MapContext } from '../../contexts/MapContext';
import { cloudinaryCore } from '../../config';

const GoogleMap = ({ google }) => {
  const { state, setMenu, setMoreMenu, onAddMarker, markers, findMarkerIconById, findInfoWindowByMarkerRefId, findMarkerByRefId, initMarkerEdit } = useContext(MapContext);

  const handleClickMap = (t, map, coord) => {
    // just to be sure, make sure the menu is collapsed
    setMenu(false);
    setMoreMenu(false);
    // handle click for when state = marker
    if (state === 'newMarker') {
      onAddMarker(coord);
    }
  }

  const showMarkers = () => markers.map(({ markerIconId, lat, lng, refId }) => {
    const { image, width, height, anchor } = findMarkerIconById(markerIconId);
    const anchorX = width / 2;
    const anchorY = anchor === 'bottom' ? height : height / 2;

    return (
      <Marker 
        name='New marker'
        position={{ lat, lng }}
        onClick={initMarkerEdit(refId)}
        icon={{
          url: cloudinaryCore.url(image, { height: 100, crop: 'fill' }),
          scaledSize: new google.maps.Size(width, height),
          anchor: new google.maps.Point(anchorX, anchorY)
        }}/>
    )
  });

  return (
    <Map 
      google={google} 
      initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
      zoom={2}
      disableDefaultUI={true}
      onClick={handleClickMap}>

        {showMarkers()}

    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(GoogleMap)
