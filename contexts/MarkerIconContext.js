import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons, updateMarkerIcon, createMarkerIcon } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';

export const MarkerIconContext = createContext();

export const MarkerIconContextProvider = ({ children }) => {
  const [isModal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState('');
  const [markerIcons, setMarkerIcons] = useState([]);

  const token = getCookie('token');
  
  useEffect(() => {
    initMarkerIcons();
  }, []);
  
  const initMarkerIcons = async () => {
    const data = await getMarkerIcons(token);
    
    if (data.error) {
      console.log(data.error);
      return setError('uh oh.. something went wrong');
    }
    
    setMarkerIcons(data);
  }
  
  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  const handleCreateUpdate = async (markericon) => {
    setLoading(true);

    let data;

    if (editId) {
      data = await updateMarkerIcon(markericon, editId, token);
    } else {
      data = await createMarkerIcon(markericon, token);
    }
    
    setLoading(false);
    
    if (data.error) return setError(data.error);
    
    if (editId) {
      setMarkerIcons(markerIcons.map(icon => {
        if (icon.id === editId) {
          return data.markerIcon;
        } else {
          return icon;
        }
      }));
    } else {
      setMarkerIcons(markerIcons.concat(data.markerIcon));
    }

    setModal(false);
  }

  return (
    <MarkerIconContext.Provider
      value={{
        isModal,
        editId,
        loading,
        error,
        openModal,
        closeModal,
        handleCreateUpdate
      }}>
      {children}
    </MarkerIconContext.Provider>
  )
}