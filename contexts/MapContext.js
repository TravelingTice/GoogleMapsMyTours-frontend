import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';
import generateId from 'generate-unique-id';
import { addMarkerInfoWindow, updateMarkerInfoWindow } from '../actions/marker';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const [infoWindows, setInfoWindows] = useState([]);
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

  const onAddMarkerInfoWindow = async infoWindow => {
    // frontend -> add infowindow for the marker (marker is already on the map)
    setInfoWindows(infoWindows.concat(infoWindow));

    // backend
    // show saving prompt in the top right
    setSaving(true);
    // get the marker we need
    const marker = findMarkerByRefId(infoWindow.markerRefId);
    console.log(marker);
    console.log(infoWindow);

    const data = await addMarkerInfoWindow({ marker, infoWindow }, token);

    setSaving(false);

    if (data.error) return setError(data.error);
  }

  const onUpdateMarkerInfoWindow = async newInfoWindow => {
    // frontend
    const oldInfoWindow = findInfoWindowByMarkerRefId(infoWindow.refId);
    const index = infoWindows.indexOf(oldInfoWindow);

    if (index !== -1) {
      const newInfoWindowArr = infoWindows;
      newInfoWindowArr[index] = newInfoWindow;
      setInfoWindows(newInfoWindowArr);
    } else {
      return setError('info window cannot be found');
    }

    // backend
    const marker = findMarkerByRefId(newInfoWindow.markerRefId);
    console.log(marker);
    console.log(infoWindow);

    setSaving(true);

    const data = await updateMarkerInfoWindow({ marker, newInfoWindow }, marker.id, token);

    setSaving(false);

    if (data.error) return setError(data.error);
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
        onAddMarkerInfoWindow,
        onUpdateMarkerInfoWindow
      }}>
      {children}
    </MapContext.Provider>
  )
}