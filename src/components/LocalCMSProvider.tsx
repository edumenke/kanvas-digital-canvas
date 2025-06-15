
import React, { createContext, useState, useEffect, useContext } from "react";

type CMSData = {
  [key: string]: string;
};

type CMSContextType = {
  data: CMSData;
  setData: (key: string, value: string) => void;
  admin: boolean;
  toggleAdmin: () => void;
};

const CMSContext = createContext<CMSContextType>({
  data: {},
  setData: () => {},
  admin: false,
  toggleAdmin: () => {},
});

export const LocalCMSProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setDataState] = useState<CMSData>({});
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("kanvas-cms");
    if (stored) setDataState(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("kanvas-cms", JSON.stringify(data));
  }, [data]);

  const setData = (key: string, value: string) => {
    setDataState(d => ({ ...d, [key]: value }));
  };

  const toggleAdmin = () => setAdmin(a => !a);

  return (
    <CMSContext.Provider value={{ data, setData, admin, toggleAdmin }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
