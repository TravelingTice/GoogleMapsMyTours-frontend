import { useState, createContext } from 'react';

export const MarkerIconContext = createContext();

export const MarkerIconContextProvider = ({ children }) => {
  const test = 'ya'

  return (
    <MarkerIconContext.Provider
      value={{
        test
      }}>
      {children}
    </MarkerIconContext.Provider>
  )
}