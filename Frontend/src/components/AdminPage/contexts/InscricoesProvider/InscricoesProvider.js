import React, { useMemo, useState } from "react";
import { InscricoesContext } from "./TabContInsc";

export const InscricoesProvider = ({ children }) => {
  const [aulasInscritasCount, setAulasInscritasCount] = useState(0);

  const value = useMemo(
    () => ({
      setAulasInscritasCount,
      countAulasInscritas: aulasInscritasCount,
    }),
    [aulasInscritasCount]
  );
  return (
    <InscricoesContext.Provider value={value}>
      {children}
    </InscricoesContext.Provider>
  );
};
