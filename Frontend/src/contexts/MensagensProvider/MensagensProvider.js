import React, { useMemo, useState } from "react";
import { MensagensContext } from "./MensagensContext";

export const MensagensProvider = ({ children }) => {
  const [mensagensCount, setMensagensCount] = useState(0);

  const value = useMemo(
    () => ({ setMensagensCount, countMensagens: mensagensCount }),
    [mensagensCount]
  );

  return (
    <MensagensContext.Provider value={value}>
      {children}
    </MensagensContext.Provider>
  );
};
