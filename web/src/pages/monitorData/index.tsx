import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { columns } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import {
  getMonitorData,
  MonitorDataResponse,
  SearchParamsType,
} from "@/api/monitor";
import { useState } from "react";
import { type PaginationState } from "@tanstack/react-table";
import { keepPreviousData } from "@tanstack/react-query";
import Search from "./components/search";
import MonitorDataProvider from "./context/monitor-data-context";
import CheckDraw from "./components/check-draw";

const MonitorData = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    userName: "",
  });
  const [queryKeyToken, setQueryKeyToken] = useState(0);
  const { data, isFetching, isLoading } = useQuery<MonitorDataResponse>({
    queryKey: ["monitorData", pagination, searchParams, queryKeyToken],
    queryFn: () =>
      getMonitorData(
        pagination.pageIndex + 1,
        pagination.pageSize,
        searchParams
      ),
    placeholderData: keepPreviousData,
  });

  const handleSearch = () => {
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
    setQueryKeyToken((prev) => prev + 1);
  };

  return (
    <MonitorDataProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">监控数据</h2>
          <p className="text-muted-foreground">埋点监控数据展示列表</p>
        </div>
        <div className="flex items-center gap-2">
          <Search
            setSearchParams={setSearchParams}
            handleSearch={handleSearch}
            isFetching={isFetching}
            searchParams={searchParams}
          />
        </div>
      </div>
      {!isLoading ? (
        <DataTable
          columns={columns}
          data={data?.records || []}
          pagination={pagination}
          setPagination={setPagination}
          totalCount={data?.pagination.total}
        />
      ) : (
        <DataTableSkeleton columnCount={1} rowCount={3} />
      )}
      <CheckDraw />
    </MonitorDataProvider>
  );
};

export default MonitorData;
