import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

interface SettingsContextType {
  whatsappNumber: string;
  loading: boolean;
  updateWhatsappNumber: (newNumber: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [whatsappNumber, setWhatsappNumber] = useState('0741958421');
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'whatsapp_support_number')
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
    } else if (data) {
      setWhatsappNumber(data.value as string);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateWhatsappNumber = async (newNumber: string) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'whatsapp_support_number', value: newNumber });

    if (error) {
      console.error('Error updating settings:', error);
      throw error;
    } else {
      setWhatsappNumber(newNumber);
    }
  };

  return (
    <SettingsContext.Provider value={{ whatsappNumber, loading, updateWhatsappNumber }}>
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