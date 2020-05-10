import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const [plusIconAppear, setPlusIcon] = useState(false);
  const [isModal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [markerIcons, setMarkerIcons] = useState([]);
  const [markers, setMarkers] = useState([]);

  const token = getCookie('token');

  const findMarkerIconById = id => markerIcons.find(icon => icon.id === id);
  
  useEffect(() => {
    initMarkerIcons();
  }, []);
  
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
        isModal,
        plusIconAppear,
        loading,
        error,
        modalLoading,
        modalError,
        markerIcons,
        findMarkerIconById,
        openModal,
        closeModal
      }}>
      {children}
    </MapContext.Provider>
  )
}