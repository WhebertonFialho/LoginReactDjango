
import React, { useContext, useState } from "react";
import { defaultConfig } from "./config";

const configContextObject = React.createContext({
    config: defaultConfig,
    setConfig: () => {}
});
 
export const useConfig = () => useContext(configContextObject);

const ConfigContextProvider = ({ children }) => {
    const [configState, setConfigState] = useState(defaultConfig);
  
    return (
      <configContextObject.Provider
        value={{
          config: configState,
          setConfig: setConfigState
        }}
      >
        {children}
      </configContextObject.Provider>
    );
  };
  
  export default ConfigContextProvider;