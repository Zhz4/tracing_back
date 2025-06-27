import { SearchParamsType } from "@/api/monitor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import EventTypeFilter from "./event-type-filter";
import { Loader2, SearchIcon } from "lucide-react";
import AppNameFilter from "./appName-filter";

interface SearchProps {
  handleSearch: (searchParams: SearchParamsType) => void;
  searchParams: SearchParamsType;
  isFetching: boolean;
  setSearchParams: (searchParams: SearchParamsType) => void;
}

const Search = ({
  handleSearch,
  isFetching,
  searchParams,
  setSearchParams,
}: SearchProps) => {
  const form = useForm<SearchParamsType>({
    defaultValues: searchParams,
  });
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className="flex flex-wrap gap-2 items-end"
          onSubmit={form.handleSubmit(handleSearch)}
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="min-w-48">
                <FormControl>
                  <Input type="text" placeholder="请输入用户名" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventTypeList"
            render={({ field }) => (
              <FormItem className="min-w-40">
                <FormControl>
                  <EventTypeFilter
                    selectedEventTypes={field.value || []}
                    onEventTypeChange={(eventTypes) => {
                      field.onChange(eventTypes);
                      setSearchParams(form.getValues());
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appNameList"
            render={({ field }) => (
              <FormItem className="min-w-40">
                <FormControl>
                  <AppNameFilter
                    selectedAppNames={field.value || []}
                    onAppNameChange={(appNames) => {
                      field.onChange(appNames);
                      setSearchParams(form.getValues());
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="cursor-pointer min-w-24"
            type="submit"
            disabled={isFetching}
          >
            {isFetching ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SearchIcon className="mr-2 h-4 w-4" />
            )}
            查询
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;
