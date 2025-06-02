import { MonitorData } from "@/api/monitor/type";
import { createContext, useContext, useState } from "react";

interface MonitorDataContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentRow: MonitorData | null;
  setCurrentRow: (row: MonitorData | null) => void;
}

const MonitorDataContext = createContext<MonitorDataContextType | null>(null);

interface props {
  children: React.ReactNode;
}

export default function MonitorDataProvider({ children }: props) {
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<MonitorData | null>(null);

  return (
    <MonitorDataContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </MonitorDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMonitorData = () => {
  const context = useContext(MonitorDataContext);
  if (!context) {
    throw new Error("useMonitorData 必须在 MonitorDataProvider 中使用");
  }
  return context;
};
