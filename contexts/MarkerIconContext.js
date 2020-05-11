import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons, updateMarkerIcon, createMarkerIcon, removeMarkerIcon } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';

export const MarkerIconContext = createContext();

export const MarkerIconContextProvider = ({ children }) => {
  const [isModal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [markerIcons, setMarkerIcons] = useState([]);

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
  }

  const initNew = () => {
    setEditId('');
    setModal(true);
  }

  const initEdit = id => {
    setEditId(id);
    setModal(true);
  }
  
  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  const handleCreateUpdate = async (markericon) => {
    setModalLoading(true);

    let data;

    if (editId) {
      data = await updateMarkerIcon(markericon, editId, token);
    } else {
      data = await createMarkerIcon(markericon, token);
    }
    
    setModalLoading(false);
    
    if (data.error) return setModalError(data.error);
    
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

  const onRemoveMarkerIcon = async () => {
    const choice = window.confirm('Are you sure?');

    if (choice) {
      setModal(false);
  
      const data = await removeMarkerIcon(editId, token);
  
      if (data.error) return setError(data.error);
  
      const newMarkerIcons = markerIcons.filter(icon => icon.id !== editId);
      setMarkerIcons(newMarkerIcons);
    }
  }

  return (
    <MarkerIconContext.Provider
      value={{
        isModal,
        editId,
        loading,
        error,
        modalLoading,
        modalError,
        markerIcons,
        findMarkerIconById,
        initNew,
        initEdit,
        openModal,
        closeModal,
        handleCreateUpdate,
        onRemoveMarkerIcon
      }}>
      {children}
    </MarkerIconContext.Provider>
  )
}