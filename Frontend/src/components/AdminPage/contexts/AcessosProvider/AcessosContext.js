import React from "react";

const context = {
  setAcessosCount: () => {},
  countAcessos: 0,
};

export const AcessosContext = React.createContext(context);
