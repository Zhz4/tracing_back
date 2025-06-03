import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchProps {
  refetch: () => void;
  isFetching: boolean;
}

const Search = ({ refetch, isFetching }: SearchProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Input type="text" placeholder="请输入用户名" />
      <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
        查询
      </Button>
    </div>
  );
};

export default Search;
