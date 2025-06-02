import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Input type="text" placeholder="请输入用户名" />
      <Button>查询</Button>
    </div>
  );
};

export default Search;
