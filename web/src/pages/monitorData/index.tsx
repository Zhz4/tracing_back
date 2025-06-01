import { DataTable } from "@/components/table/data-table";
import { columns } from "./components/columns";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMonitorData, MonitorDataResponse } from "@/api/monitor";
import { useState } from "react";
import { type PaginationState } from "@tanstack/react-table";

const MonitorData = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useQuery<MonitorDataResponse>({
    queryKey: ["monitorData", pagination],
    queryFn: () =>
      getMonitorData(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.records || []}
        pagination={pagination}
        setPagination={setPagination}
        totalCount={data?.pagination.total}
      />
    </>
  );
};

export default MonitorData;
