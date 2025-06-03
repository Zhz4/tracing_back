import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { LoadingOverlay } from "@/components/ui/loading-modal";
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
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, refetch, isFetching, isLoading } =
    useQuery<MonitorDataResponse>({
      queryKey: ["monitorData", pagination],
      queryFn: () =>
        getMonitorData(pagination.pageIndex + 1, pagination.pageSize),
      placeholderData: keepPreviousData,
    });

  const handleSearch = () => {
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
    refetch();
  };

  return (
    <MonitorDataProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">监控数据</h2>
          <p className="text-muted-foreground">埋点监控数据展示列表</p>
        </div>
        <div className="flex items-center gap-2">
          <Search refetch={handleSearch} isFetching={isFetching} />
        </div>
      </div>

      <LoadingOverlay isOpen={isFetching && !isLoading} showModal={true}>
        {!isLoading ? (
          <DataTable
            columns={columns}
            data={data?.records || []}
            pagination={pagination}
            setPagination={setPagination}
            totalCount={data?.pagination.total}
          />
        ) : (
          <DataTableSkeleton
            columnCount={columns.length}
            rowCount={pagination.pageSize}
          />
        )}
      </LoadingOverlay>

      <CheckDraw />
    </MonitorDataProvider>
  );
};

export default MonitorData;
