import { SearchParamsType } from "@/api/monitor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import EventTypeFilter from "./events/event-type-filter";
import { Loader2 } from "lucide-react";

interface SearchProps {
  handleSearch: (searchParams: SearchParamsType) => void;
  searchParams: SearchParamsType;
  isFetching: boolean;
}

const Search = ({ handleSearch, isFetching, searchParams }: SearchProps) => {
  const form = useForm<SearchParamsType>({
    defaultValues: searchParams,
  });

  const handleEventTypeChange = (eventTypes: string[]) => {
    const newSearchParams = {
      ...form.getValues(),
      eventTypeList: eventTypes.length > 0 ? eventTypes : undefined,
    };
    handleSearch(newSearchParams);
  };

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
            {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            查询
          </Button>
        </form>
      </Form>
      <EventTypeFilter
        selectedEventTypes={searchParams.eventTypeList || []}
        onEventTypeChange={handleEventTypeChange}
      />
    </div>
  );
};

export default Search;
