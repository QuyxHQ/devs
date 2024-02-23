import React, { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import { api } from "../../utils/class/api.class";

export const useAppStore = () => useContext(AppContext);

const AppProvider = ({ children }: { children: React.JSX.Element }) => {
  const [isMounting, setIsMounting] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<QuyxDev>();
  const [metadata, setMetadata] = useState<QuyxMetadata>();

  useEffect(() => {
    (async function () {
      setIsMounting(true);

      const _userInfo = await api.current();
      setUserInfo(_userInfo);
      setIsLoggedIn(_userInfo ? true : false);

      const metadata = await api.metadata();
      setMetadata(metadata);

      setIsMounting(false);
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isMounting,
        isLoggedIn,
        userInfo,
        metadata,
        shouldRefresh: refresh,
        refresh: () => setRefresh(!refresh),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
