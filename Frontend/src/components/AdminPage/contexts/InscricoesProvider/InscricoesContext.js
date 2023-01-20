import React from "react";

const context = {
  setAulasInscritasCount: () => {},
  countAulasInscritas: 0,
};

export const InscricoesContext = React.createContext(context);
