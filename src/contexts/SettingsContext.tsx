import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  whatsappNumber: string;
  updateWhatsappNumber: (newNumber: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [whatsappNumber, setWhatsappNumber] = useState('0741958421');

  useEffect(() => {
    const savedNumber = localStorage.getItem('silla_whatsapp');
    if (savedNumber) {
      setWhatsappNumber(savedNumber);
    }
  }, []);

  const updateWhatsappNumber = (newNumber: string) => {
    setWhatsappNumber(newNumber);
    localStorage.setItem('silla_whatsapp', newNumber);
  };

  return (
    <SettingsContext.Provider value={{ whatsappNumber, updateWhatsappNumber }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};