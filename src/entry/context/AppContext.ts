import { createContext } from "react";

const AppContext = createContext<AppContextProps>({
  isMounting: true,
  isLoggedIn: false,
});

export default AppContext;
