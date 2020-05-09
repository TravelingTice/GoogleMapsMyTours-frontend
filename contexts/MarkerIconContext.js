import { useState, createContext } from 'react';

export const MarkerIconContext = createContext();

export const MarkerIconContextProvider = ({ children }) => {
  const [isModal, setModal] = useState(false);

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  return (
    <MarkerIconContext.Provider
      value={{
        isModal,
        openModal,
        closeModal
      }}>
      {children}
    </MarkerIconContext.Provider>
  )
}