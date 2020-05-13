import { useState, useEffect, createContext } from 'react';
import { getCookie } from '../actions/auth';
import { getMaps } from '../actions/map';

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState({
    name: ''
  });
  const [isShareModal, setShareModal] = useState(false);
  const [isEmbedModal, setEmbedModal] = useState(false);

  const token = getCookie('token');

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    const maps = await getMaps(token);
    setMaps(maps);
    setLoading(false);
  }

  return (
    <DashboardContext.Provider
      value={{
        loading,
        maps,
        selectedMap,
        isShareModal,
        isEmbedModal,
        setShareModal,
        setEmbedModal,
        setSelectedMap
      }}>
      {children}
    </DashboardContext.Provider>
  )
}