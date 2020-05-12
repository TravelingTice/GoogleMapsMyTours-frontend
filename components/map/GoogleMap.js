import { Map, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY, cloudinaryCore } from '../../config';
import { useContext, useState, useEffect, useRef } from 'react';
import { MapContext } from '../../contexts/MapContext';
import { panMapTo } from '../../helpers/map';

const GoogleMap = ({ google }) => {
  const { state, setMenu, setMoreMenu, onAddMarker, markers, lines, findMarkerIconById, selectedLine, setSelectedLine, initMarkerEdit, setLineModal } = useContext(MapContext);
  const [selectedMarkers, setMarkers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  let mapRef = useRef(null);

  useEffect(() => {
    if (selectedMarkers.length >= 2) {
      const coords = selectedMarkers.map(({lat, lng}) => {
        return { lat, lng }
      });

      setSelectedLine({
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWeight: 1,
        coords
      });
      panMapTo(coords, mapRef.map, google);
      setLineModal(true);
    }
  }, [selectedMarkers]);

  useEffect(() => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 10);
  }, [selectedLine])

  const handleClickMap = (t, map, coord) => {
    // just to be sure, make sure the menu is collapsed
    setMenu(false);
    setMoreMenu(false);
    // handle click for when state = marker
    if (state === 'newMarker') {
      onAddMarker(coord);
    }
  }

  const handleMarkerClick = marker => (props, googleMarker, e) => {
    if (state === 'newLine') {
      setMarkers(selectedMarkers.concat(marker));
    } else {
      initMarkerEdit(marker.id);
    }
  }

  const showMarkers = () => markers.map(marker => {
    const { markerIconId, lat, lng, refId } = marker;
    const { image, width, height, anchor } = findMarkerIconById(markerIconId);
    const anchorX = width / 2;
    const anchorY = anchor === 'bottom' ? height : height / 2;

    return (
      <Marker 
        key={refId}
        name='New marker'
        position={{ lat, lng }}
        onClick={handleMarkerClick(marker)}
        icon={{
          url: cloudinaryCore.url(image, { height: 100, crop: 'fill' }),
          scaledSize: new google.maps.Size(width, height),
          anchor: new google.maps.Point(anchorX, anchorY)
        }}/>
    )
  });

  const showLines = () => lines.map(line => (
    <Polyline
      path={line.path}
      strokeColor={line.strokeColor}
      strokeOpacity={line.strokeOpacity}
      strokeWeight={line.strokeWeight} />
  ))


  const showSelectedLine = () => {
    const { strokeColor, strokeWeight, strokeOpacity, coords } = selectedLine;
    return (
      <Polyline
        path={coords}
        strokeColor={strokeColor}
        strokeWeight={strokeWeight}
        strokeOpacity={strokeOpacity} />
    )
  }

  return (
    <Map 
      ref={(map) => mapRef = map}
      google={google} 
      initialCenter={{ lat: 24.523387, lng: 11.510063 }} 
      zoom={2}
      disableDefaultUI={true}
      onClick={handleClickMap}>

        {showMarkers()}
        {showLines()}
        {selectedLine && !refresh ? showSelectedLine() : null}

    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(GoogleMap)
