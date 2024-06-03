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
import { acceptNumbersOnly, phoneRegex } from "@/utils/regExpression";
import { __ } from "@/utils/getElementById";
import { useRouter } from "next/navigation";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import AuthContext from "@/context/authContext";
import { verifyToken } from "@/utils/verifyToken";
import host from "@/utils/host";

const formSchema = z.object({
  driver_name: z
    .string()
    .min(5, { message: "Drver's Name must be at least 5 characters long." }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters long.",
  }),
  amount: z.string().min(4, { message: "Please enter a valid amount." }),
  account_type: z.string(),
  phone_number: z
    .string()
    .regex(phoneRegex, "please enter a valid phone numeber"),
  email_address: z.string().email().optional(),
  date: z.date({
    required_error: "This field is required.",
  }),
});

const AddOutsourcedDriver = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const router = useRouter();
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
      return;
    }
    try {
      setLoading(true);
      __("submitBtn").innerHTML = "Submitting...";
      const response = await axios.post("/api/driver", values);
      const { data } = response;

      if (data?.message === "success") {
        toast({
          title: "New record added successfully.",
        });
        router.push("/admin/drivers");
      } else {
        toast({
          variant: "destructive",
          description: `${data?.message}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `Error creating new Outsourced Driver`,
      });
    } finally {
      setLoading(false);
      __("submitBtn").innerHTML = "Submit";
    }
  }

  const isInputFieldsValid = (field) => {
    return (
      field.driver_name &&
      field.address &&
      field.account_type &&
      field.amount &&
      field.phone_number
    );
  };

  useEffect(() => {
    const verifyServerToken = async () => {
      const res = await verifyToken(user?.token);
      if (res.message !== "success") {
        window.location = `${host.host_url}/login`;
      }
    };
    verifyServerToken();
  }, [user?.token]);

  return (
    <>
      <div className="h-screen w-full flex flex-col  overflow-y-scroll pb-[100px] md:pb-20">
        <div className="w-full bg-white h-[60px] p-5 flex items-center border-[#eee] border-b-[1px]">
          <div className="w-fit flex  h-[60px]">
            <Link
              href={`/admin/drivers?q=${user?.token}`}
              className="border-r-[1px] border-[#eee] w-fit flex items-center pr-5"
            >
              <ChevronLeft size={30} />
            </Link>
          </div>
        </div>
        <div className="w-full my-5 bg-[whitesmoke] px-5 flex flex-col h-screen ">
          <div className="p-5">
            <h1 className={cn(`${raleway.className} font-bold`)}>
              Add new Driver
            </h1>
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Driver's Address"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          {...field}
                          className="form-input"
                          id="phone_number"
                          onKeyUp={() => acceptNumbersOnly("phone_number")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email Address&nbsp;(
                        <span className="italic text-sm">optional</span>)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          {...field}
                          className="form-input"
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
                    name="account_type"
                    render={({ field }) => (
                      <FormItem className="md:w-1/5 w-full">
                        <FormLabel>Account type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Account Type"
                                className="form-input"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="outsourced">
                              Outsourced
                            </SelectItem>
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" id="submitBtn" disabled={loading}>
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

export default AddOutsourcedDriver;
