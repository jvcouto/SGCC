import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/request.service";

import IPeriod from "../types/apiResponses/periods";

interface IPeriodContext {
  selectedPeriod: number;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<number>>;
  periodList: IPeriod[];
}

export const AuthContext = createContext({} as IPeriodContext);

// eslint-disable-next-line react/prop-types
export function PeriodProvider({ children }) {
  const [selectedPeriod, setSelectedPeriod] = useState<number>();

  const [periodList, setPeriodList] = useState<Array<IPeriod>>([]);

  useEffect(() => {
    api.get<{ data: IPeriod[] }>(`public/list/periods`).then((response) => {
      const { data: periodListFetched } = response.data;
      setPeriodList(periodListFetched.length ? periodListFetched : []);
      setSelectedPeriod(
        periodListFetched.length
          ? periodListFetched[periodListFetched.length - 1].id
          : null
      );
    });
  }, []);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        selectedPeriod,
        setSelectedPeriod,
        periodList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const usePeriod = () => {
  const context = useContext(AuthContext);
  const { selectedPeriod, setSelectedPeriod, periodList } = context;

  return {
    selectedPeriod,
    setSelectedPeriod,
    periodList,
  };
};
