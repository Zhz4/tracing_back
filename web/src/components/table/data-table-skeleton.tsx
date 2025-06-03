import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
}

export function DataTableSkeleton({
  columnCount = 5,
  rowCount = 10,
}: DataTableSkeletonProps) {
  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columnCount }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-6 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePaginationSkeleton />
    </div>
  );
}

function DataTablePaginationSkeleton() {
  return (
    <div
      className="flex items-center justify-between overflow-clip px-2"
      style={{ overflowClipMargin: 1 }}
    >
      <div className="text-muted-foreground hidden flex-1 text-sm sm:block">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium sm:block">每页行数</p>
          <Skeleton className="h-8 w-[70px]" />
        </div>
        <div className="flex w-[120px] items-center justify-center text-sm font-medium">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="hidden h-8 w-8 lg:flex" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="hidden h-8 w-8 lg:flex" />
        </div>
      </div>
    </div>
  );
}
