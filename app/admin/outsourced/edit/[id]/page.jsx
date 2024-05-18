"use client";

import { CalendarIcon, ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import "../../../cars/cars.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { acceptNumbersOnly } from "@/utils/regExpression";
import { __ } from "@/utils/getElementById";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  driver_name: z
    .string()
    .min(5, { message: "Drver's Name must be at least 5 characters long." }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long.",
  }),
  amount: z.string().min(4, { message: "Please enter a valid amount." }),
  vehicle_type: z.string(),
  date: z.date({
    required_error: "This field is required.",
  }),
});
const EditOutSorucedDriver = ({ params }) => {
  const [data, setData] = useState([]);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {}

  const handleFormUpdate = async (field, value) => {
    if (!value) return false;
    const fieldName = __(field);
    fieldName.disabled = true;
    fieldName.innerHTML = "Updating...";
    try {
      const response = await axios.put("/api/outsourced", {
        id: params?.id,
        value,
        field,
      });

      if (response.data.message !== "success") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.data.message,
        });
      } else {
        toast({ title: "Updated successfully." });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      fieldName.innerHTML = "Update";
      fieldName.disabled = false;
    }
  };

  useEffect(() => {
    const getRecord = async () => {
      if (!params?.id || params.id === "") {
        router.push("/admin/outsourced");
      }
      try {
        const { data } = await axios.get(`/api/outsourced/${params?.id}`);
        if (data?.message === "No Record found with the ID Provided") {
          router.push("/admin/outsourced");
        }
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecord();
  }, [params.id, router]);

  return (
    <>
      <div className="h-screen w-full flex flex-col  overflow-y-scroll">
        <div className="w-full bg-white h-[60px] p-5 flex items-center border-[#eee] border-b-[1px]">
          <div className="w-fit flex  h-[60px]">
            <Link
              href="/admin/outsourced"
              className="border-r-[1px] border-[#eee] w-fit flex items-center pr-5"
            >
              <ChevronLeft size={30} />
            </Link>
          </div>
        </div>
        <div className="w-full my-5 bg-[whitesmoke] px-5 flex flex-col h-screen ">
          <div className=" p-5">
            <h1>Edit Vendor Information</h1>
          </div>
          <div className="p-5 bg-white container w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="driver_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver&apos;s Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Driver's Name"
                          {...field}
                          className="form-input"
                          defaultValue={data?.driver_name}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="driver_name"
                        onClick={() =>
                          handleFormUpdate("driver_name", field?.value)
                        }
                      >
                        Update
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="resize-none"
                          {...field}
                          defaultValue={data?.description}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="description"
                        onClick={() =>
                          handleFormUpdate("description", field?.value)
                        }
                      >
                        Update
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full flex items-center gap-5 flex-col md:flex-row ">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="md:w-1/5 w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Amount"
                            {...field}
                            className="form-input"
                            id="amount_"
                            defaultValue={field.value || data?.amount}
                            onKeyUp={() => acceptNumbersOnly("amount_")}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          disabled={!field.value}
                          id="amount"
                          className="w-full"
                          onClick={() =>
                            handleFormUpdate("amount", parseInt(field?.value))
                          }
                        >
                          Update
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicle_type"
                    render={({ field }) => (
                      <FormItem className="md:w-1/5 w-full">
                        <FormLabel>Vehicle type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Vehicle Type"
                                className="form-input"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="peogout">PEOGOUT</SelectItem>
                            <SelectItem value="bus">BUS</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          disabled={!field.value}
                          id="vehicle_type"
                          className="w-full"
                          onClick={() =>
                            handleFormUpdate("vehicle_type", field?.value)
                          }
                        >
                          Update
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full md:w-fit">
                        <FormLabel>Date</FormLabel>
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
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <=
                                new Date(new Date().getTime() - 86400000)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Button
                          type="button"
                          disabled={!field.value}
                          id="date"
                          onClick={() => handleFormUpdate("date", field?.value)}
                        >
                          Update
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOutSorucedDriver;
