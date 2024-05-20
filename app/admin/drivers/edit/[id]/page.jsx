"use client";

import { ChevronLeft } from "lucide-react";
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
import { raleway } from "@/lib/fonts";
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
      const response = await axios.put("/api/driver", {
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
    } finally {
      fieldName.innerHTML = "Update";
      fieldName.disabled = false;
    }
  };

  useEffect(() => {
    const getRecord = async () => {
      if (!params?.id || params.id === "") {
        router.push("/admin/drivers");
      }
      try {
        const { data } = await axios.get(`/api/driver/${params?.id}`);
        if (data?.message === "No Record found with the ID Provided") {
          router.push("/admin/drivers");
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
      <div className="h-screen w-full flex flex-col  overflow-y-scroll pb-[100px] md:pb-20">
        <div className="w-full bg-white h-[60px] p-5 flex items-center border-[#eee] border-b-[1px]">
          <div className="w-fit flex  h-[60px]">
            <Link
              href="/admin/drivers"
              className="border-r-[1px] border-[#eee] w-fit flex items-center pr-5"
            >
              <ChevronLeft size={30} />
            </Link>
          </div>
        </div>
        <div className="w-full my-5 bg-[whitesmoke] px-5 flex flex-col h-screen ">
          <div className={cn(`${raleway.className} font-bold p-5`)}>
            <h1>Edit Driver Information</h1>
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Address"
                          className="resize-none"
                          {...field}
                          defaultValue={data?.address}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="address"
                        onClick={() =>
                          handleFormUpdate("address", field?.value)
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
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          {...field}
                          className="form-input"
                          defaultValue={data?.phone_number}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="phone_number"
                        onClick={() =>
                          handleFormUpdate("phone_number", field?.value)
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
                          defaultValue={data?.email_address}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="email_address"
                        onClick={() =>
                          handleFormUpdate("email_address", field?.value)
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
                                placeholder="Account type"
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
                        <Button
                          type="button"
                          disabled={!field.value}
                          id="account_type"
                          className="w-full"
                          onClick={() =>
                            handleFormUpdate("account_type", field?.value)
                          }
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
