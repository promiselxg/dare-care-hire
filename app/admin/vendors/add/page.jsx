"use client";

import { CalendarIcon, ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import "../../cars/cars.css";

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
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { acceptNumbersOnly } from "@/utils/regExpression";
import { __ } from "@/utils/getElementById";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import { verifyToken } from "@/utils/verifyToken";
import host from "@/utils/host";
import useFetch from "@/hooks/useFetch";

const formSchema = z.object({
  organization_name: z.string().min(10, {
    message: "Organization's Name must be at least 10 characters long.",
  }),
  client_name: z.string().min(5, {
    message: "Client's Name must be at least 5 characters long.",
  }),
  driver_name: z
    .string()
    .min(5, { message: "Drver's Name must be at least 5 characters long." }),
  job_description: z.string().min(10, {
    message: "Job Description must be at least 10 characters long.",
  }),
  pickup_location: z.string().min(10),
  dropoff_location: z.string().min(10),
  additional_note: z.string().min(10).optional(),
  amount: z.string().min(4, { message: "Please enter a valid amount." }),
  vehicle_type: z.string(),
  vehicle_model: z.string(),
  pickup_date: z.date({
    required_error: "This field is required.",
  }),
  dropoff_date: z.date({
    required_error: "This field is required.",
  }),
});

const AddVendor = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, loading: loadingData } = useFetch("/setting/vehicle_type");
  const { data: brandData, loading: loadingBrand } = useFetch(
    "/setting/vehicle_brand"
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values) {
    if (!isInputFieldsValid(values)) {
      toast({
        variant: "destructive",
        title: "Required Fields",
        description: "Please fill out the required fields.",
      });
    }
    try {
      setLoading(true);
      __("submitBtn").innerHTML = "Submiting...";
      const { data } = await axios.post("/api/vendor", values);
      if (data?.message === "success") {
        setLoading(false);
        toast({
          title: "New Vendor record added successfully.",
        });
        __("submitBtn").innerHTML = "Submit";
        router.push("/admin/vendors");
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          description: `${data?.message}`,
        });
        __("submitBtn").innerHTML = "Submit";
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `Error creating vendor`,
      });
      __("submitBtn").innerHTML = "Submit";
    }
  }
  useEffect(() => {
    const verifyServerToken = async () => {
      const res = await verifyToken(user?.token);
      if (res.message !== "success") {
        window.location = `${host.host_url}/login`;
      }
    };
    verifyServerToken();
  }, [user?.token]);

  const isInputFieldsValid = (field) => {
    return (
      field.organization_name &&
      field.client_name &&
      field.driver_name &&
      field.job_description &&
      field.pickup_location &&
      field.dropoff_location &&
      field.amount &&
      field.vehicle_type &&
      field.vehicle_model &&
      field.dropoff_date &&
      field.pickup_date
    );
  };
  return (
    <>
      <div className="h-screen w-full flex flex-col  overflow-y-scroll">
        <div className="w-full bg-white h-[60px] p-5 flex items-center border-[#eee] border-b-[1px]">
          <div className="w-fit flex  h-[60px]">
            <Link
              href={`/admin/vendors?q=${user?.token}`}
              className="border-r-[1px] border-[#eee] w-fit flex items-center pr-5"
            >
              <ChevronLeft size={30} />
            </Link>
          </div>
        </div>
        <div className="w-full my-5 bg-[whitesmoke] px-5 flex flex-col h-screen ">
          <div className=" p-5">
            <h1>New Vendor</h1>
          </div>
          <div className="p-5 bg-white container w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="organization_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization&apos;s Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Organization's Name"
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client&apos;s Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Client's Name"
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Job Description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
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
                            id="amount"
                            defaultValue={field.value}
                            onKeyUp={() => acceptNumbersOnly("amount")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicle_type"
                    render={({ field }) => (
                      <FormItem className="md:w-1/5 w-full">
                        <FormLabel>Car Make</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={loadingData}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Car Make"
                                className="form-input"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data?.map((item) => {
                              return (
                                <SelectItem
                                  value={item?.vehicle_type
                                    ?.toLowerCase()
                                    .replace(" ", "_")}
                                  key={item.id}
                                >
                                  {item?.vehicle_type?.toUpperCase()}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicle_model"
                    render={({ field }) => (
                      <FormItem className="md:w-1/5 w-full">
                        <FormLabel>Car Model</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={loadingBrand}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Car Model"
                                className="form-input"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brandData?.map((item) => {
                              return (
                                <SelectItem
                                  value={item?.vehicle_brand
                                    ?.toLowerCase()
                                    .replace(" ", "_")}
                                  key={item?.id}
                                >
                                  {item?.vehicle_brand?.toUpperCase()}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickup_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full md:w-fit">
                        <FormLabel>Pickup Date</FormLabel>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dropoff_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full md:w-fit">
                        <FormLabel>Drop-off Date</FormLabel>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="pickup_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pickup Location"
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropoff_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drop-off Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Drop-off Location"
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additional_note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional Notes"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  id="submitBtn"
                  disabled={loading}
                  className="w-full md:w-fit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVendor;
