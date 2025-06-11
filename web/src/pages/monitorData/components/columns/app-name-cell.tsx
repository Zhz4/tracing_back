interface AppNameCellProps {
  appName?: string;
}

export const AppNameCell = ({ appName }: AppNameCellProps) => {
  return (
    <div className="px-3 py-1 rounded-full text-sm font-medium  ">
      {appName || "未知应用"}
    </div>
  );
};
