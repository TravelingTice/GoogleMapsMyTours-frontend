import { useState, createContext } from 'react';

export const MarkerIconContext = createContext();

export const MarkerIconContextProvider = ({ children }) => {
  const [isModal, setModal] = useState(true);
  const [editId, setEditId] = useState('');

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  return (
    <MarkerIconContext.Provider
      value={{
        isModal,
        editId,
        openModal,
        closeModal
      }}>
      {children}
    </MarkerIconContext.Provider>
  )
}