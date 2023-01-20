import React, { useMemo, useState } from "react";
import { AcessosContext } from "./AcessosContext";

export const AcessosProvider = ({ children }) => {
  const [acessosCount, setAcessosCount] = useState(0);

  const value = useMemo(
    () => ({ setAcessosCount, countAcessos: acessosCount }),
    [acessosCount]
  );

  return (
    <AcessosContext.Provider value={value}>{children}</AcessosContext.Provider>
  );
};
