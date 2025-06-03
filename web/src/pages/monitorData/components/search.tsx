import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface SearchProps {
  refetch: () => void;
  isFetching: boolean;
}

const Search = ({ refetch, isFetching }: SearchProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Input type="text" placeholder="请输入用户名" />
      <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : "查询"}
      </Button>
    </div>
  );
};

export default Search;
