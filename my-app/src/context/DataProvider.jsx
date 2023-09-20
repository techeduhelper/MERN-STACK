import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({
    data: null,
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = account?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const localData = JSON.parse(data);
      setAccount({
        ...localData,
        data: localData?.data || null,
        token: localData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
