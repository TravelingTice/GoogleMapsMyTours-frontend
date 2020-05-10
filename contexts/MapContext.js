import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  // states: add marker, add line, add kml
  const [state, setState] = useState('');
  const [plusIconAppear, setPlusIcon] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const [isSelectedMarkerIconModal, setSelectedMarkerIconModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [markerIcons, setMarkerIcons] = useState([]);
  const [selectedMarkerIcon, setSelectedMarkerIcon] = useState(null);
  const [markers, setMarkers] = useState([]);

  const token = getCookie('token');

  const findMarkerIconById = id => markerIcons.find(icon => icon.id === id);

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
    // set the selected marker icon as the first
    setSelectedMarkerIcon(data[0]);
    setTimeout(() => setPlusIcon(true), 500);
  }

  const onSelectMarkerIcon = e => setSelectedMarkerIcon(e.target.value);
  
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
        selectedMarkerIcon,
        setSelectedMarkerIconModal,
        setState,
        toggleMenu,
        findMarkerIconById,
        onSelectMarkerIcon,
      }}>
      {children}
    </MapContext.Provider>
  )
}