interface IpCellProps {
  ip?: string;
}

export const IpCell = ({ ip }: IpCellProps) => {
  return (
    <div className="font-mono text-sm bg-muted px-2 py-1 rounded border border-border text-foreground">
      {ip || "N/A"}
    </div>
  );
};
