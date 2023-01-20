import React, { useMemo, useState } from "react";
import { TabContext } from "./TabContext";

export const TabProvider = ({ children }) => {
  const [aulasCount, setAulasCount] = useState(0);

  const value = useMemo(
    () => ({ setAulasCount, countAulas: aulasCount }),
    [aulasCount]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};
