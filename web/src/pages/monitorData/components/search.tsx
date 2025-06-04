import { SearchParamsType } from "@/api/monitor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface SearchProps {
  handleSearch: (searchParams: SearchParamsType) => void;
  searchParams: SearchParamsType;
  isFetching: boolean;
}

const Search = ({ handleSearch, isFetching, searchParams }: SearchProps) => {
  const form = useForm<SearchParamsType>({
    defaultValues: searchParams,
  });
  return (
    <div className="flex w-full items-center gap-2">
      <Form {...form}>
        <form className="flex gap-2" onSubmit={form.handleSubmit(handleSearch)}>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="请输入用户名" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isFetching}>
            查询
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;
