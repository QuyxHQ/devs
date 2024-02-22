import { createContext } from "react";

const AppContext = createContext<AppContextProps>({
  isMounting: true,
  shouldRefresh: true,
  refresh() {},
  isLoggedIn: false,
});

export default AppContext;
