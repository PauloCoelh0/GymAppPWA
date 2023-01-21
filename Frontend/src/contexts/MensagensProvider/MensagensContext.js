import React from "react";

const context = {
  setMensagens: () => {},
  countMensagens: () => {},
};

export const MensagensContext = React.createContext(context);
