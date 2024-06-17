"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Calendar as CalendarIcon, RefreshCw } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DriverContext } from "@/context/sortContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  account_type: z.string({
    required_error: "Please select an email to display.",
  }),
});

export function DriversDataTable({ columns, data, loading }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const { handleSort, handleResetSort } = useContext(DriverContext);
  const [accountType, setAccountType] = useState("");
  const [date, setDate] = useState(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      sorting,
      columnVisibility,
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values) {}

  return (
    <div className="rounded-md border md:my-5 p-5 bg-white mb-20">
      <div className="flex items-center py-4 justify-between w-full flex-col md:flex-row space-y-3 ">
        <Input
          placeholder="Search Table"
          value={table?.getColumn("driver_name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("driver_name")?.setFilterValue(event.target.value)
          }
          className="md:w-2/6 w-full"
        />
        <div className="flex items-center gap-2 flex-col md:flex-row pb-3 md:w-1/2 w-full justify-end">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-2 flex-col md:flex-row w-full"
            >
              <FormField
                control={form.control}
                name="account_type"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full md:w-fit">
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setAccountType(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="md:w-[180px] w-full">
                          <SelectValue placeholder="Account Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="outsourced">Outsourced</SelectItem>
                        <SelectItem value="inhouse">In-House</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full md:w-fit">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "md:w-[240px] w-full text-left font-normal h-10",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(value) => {
                            field.onChange(value);
                            setDate(value);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                id="filterBtn"
                type="button"
                className="md:w-fit w-full"
                onClick={() => handleSort(accountType, date)}
                disabled={!accountType || !date || loading}
              >
                Filter
              </Button>
              <Button
                onClick={() => handleResetSort()}
                className="md:w-fit w-full"
                disabled={loading}
              >
                <RefreshCw />
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Table className="border w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="border">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {loading ? (
          <>
            <tbody>
              <tr>
                <td colSpan="7">
                  <div className="p-5 w-full space-y-2">
                    <Skeleton className="h-2 w-full bg-[#171726] rounded-full" />
                    <Skeleton className="h-2 w-2/3 bg-[#212136] rounded-full" />
                    <Skeleton className="h-2 w-1/3 bg-[#0d0d16] rounded-full" />
                  </div>
                </td>
              </tr>
            </tbody>
          </>
        ) : (
          <TableBody className="border">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
      <div className="space-x-2 py-4 float-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
