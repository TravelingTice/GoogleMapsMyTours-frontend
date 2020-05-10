import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  // states: add marker, add line, add kml
  const [state, setState] = useState('');
  const [plusIconAppear, setPlusIcon] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const [isModal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [markerIcons, setMarkerIcons] = useState([]);
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
    setTimeout(() => setPlusIcon(true), 500);
  }
  
  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  return (
    <MapContext.Provider
      value={{
        state,
        isModal,
        isMenu,
        plusIconAppear,
        loading,
        error,
        modalLoading,
        modalError,
        markerIcons,
        setState,
        toggleMenu,
        findMarkerIconById,
        openModal,
        closeModal
      }}>
      {children}
    </MapContext.Provider>
  )
}