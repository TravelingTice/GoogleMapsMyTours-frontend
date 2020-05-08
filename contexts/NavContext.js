import { useState, createContext } from 'react';

export const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
  const [isNav, setIsNav] = useState(false); // false

  const closeNav = e => {
    if (e.target.id === 'close-nav') {
      setIsNav(false);
    }
  }

  const closeNavForcibly = () => {
    setIsNav(false);
  }

  const openNav = () => {
    setIsNav(true);
  }

  return (
    <NavContext.Provider
      value={{
        isNav,
        closeNav,
        closeNavForcibly,
        openNav
      }}>
      {children}
    </NavContext.Provider>
  )
}