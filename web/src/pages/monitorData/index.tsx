import { DataTable } from "@/components/table/data-table";
import { columns } from "./components/columns";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMonitorData, MonitorDataResponse } from "@/api/monitor";
import { useState } from "react";
import { type PaginationState } from "@tanstack/react-table";
import Search from "./components/search";
import MonitorDataProvider from "./context/monitor-data-context";
import CheckDraw from "./components/check-draw";

const MonitorData = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  const { data } = useQuery<MonitorDataResponse>({
    queryKey: ["monitorData", pagination],
    queryFn: () =>
      getMonitorData(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  return (
    <MonitorDataProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">监控数据</h2>
          <p className="text-muted-foreground">埋点监控数据展示列表</p>
        </div>
        <div className="flex items-center gap-2">
          <Search />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data?.records || []}
        pagination={pagination}
        setPagination={setPagination}
        totalCount={data?.pagination.total}
      />
      <CheckDraw />
    </MonitorDataProvider>
  );
};

export default MonitorData;
