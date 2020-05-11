import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';
import generateId from 'generate-unique-id';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // startup
  const [plusIconAppear, setPlusIcon] = useState(false);
  const [markerIcons, setMarkerIcons] = useState([]);
  // states: add marker, add line, add kml
  const [state, setState] = useState('');
  const [isMenu, setMenu] = useState(false);
  // marker crud
  const [isSelectedMarkerIconModal, setSelectedMarkerIconModal] = useState(false);
  const [isInfoWindowModal, setInfoWindowModal] = useState(false);
  const [selectedMarkerIcon, setSelectedMarkerIcon] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindow] = useState([]);
  const [markerEditId, setMarkerEditId] = useState('');

  const [modalError, setModalError] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const token = getCookie('token');

  const findMarkerIconById = id => markerIcons.find(icon => icon.id === id);

  const findMarkerByRefId = refId => markers.find(marker => marker.refId === refId);

  const findInfoWindowByMarkerRefId = refId => infoWindows.find(infoWindow => infoWindow.markerRefId === refId);

  const toggleMenu = () => setMenu(!isMenu);
  
  useEffect(() => {
    initMarkerIcons();
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [state]);
  
  const initMarkerIcons = async () => {
    const data = await getMarkerIcons(token);

    setLoading(false);
    
    if (data.error) {
      console.log(data.error);
      return setError('uh oh.. something went wrong');
    }
    
    setMarkerIcons(data);
    setTimeout(() => setPlusIcon(true), 500);
    // add new marker for testing purpose
    const newM = {
      lat: 54.23955075555233,
      lng: 39.052787609375,
      refId: "50y519e680f23k5gra0e",
      markerIconId: 7
    }
    setMarkers([newM]);
    setInfoWindowModal(true);
  }

  const onSelectMarkerIcon = e => setSelectedMarkerIcon(e.target.value);

  // marker crud
  const onAddMarker = (coords) => {
    const newMarker = {
      lat: coords.latLng.lat(),
      lng: coords.latLng.lng(),
      refId: generateId(),
      markerIconId: selectedMarkerIcon.id
    }
    setMarkers(markers.concat(newMarker));
    // clear the edit id (because this is a new marker)
    setMarkerEditId('');
    // open infowindow modal
    setInfoWindowModal(true);
  }
  
  return (
    <MapContext.Provider
      value={{
        state,
        isSelectedMarkerIconModal,
        isMenu,
        plusIconAppear,
        loading,
        error,
        modalLoading,
        modalError,
        markerIcons,
        markers,
        selectedMarkerIcon,
        isInfoWindowModal,
        markerEditId,
        setSelectedMarkerIconModal,
        setInfoWindowModal,
        setMenu,
        setState,
        toggleMenu,
        setMarkers,
        findMarkerIconById,
        findMarkerByRefId,
        onSelectMarkerIcon,
        onAddMarker,
      }}>
      {children}
    </MapContext.Provider>
  )
}