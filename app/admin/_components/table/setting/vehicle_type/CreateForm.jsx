"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { __ } from "@/utils/getElementById";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  vehicle_type: z.string().min(2),
});

export function NewVehicleTypeForm() {
  const [formData, setFormData] = useState("");
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values) {}

  const handleFormSubmit = async (field) => {
    if (!formData) return false;
    try {
      __("submitBtn").innerHTML = "please wait...";
      __("submitBtn").disabled = true;
      const { data } = await axios.post(`/api/setting/${field}`, {
        formData,
      });
      if (data?.message !== "success") {
        toast({
          variant: "destructive",
          title: "An Error occured",
          description: `${data?.message}`,
        });
      } else {
        toast({
          title: "Added successfully.",
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An Error occured",
        description:
          `An unknown error occured while trying to add a new ` +
          field.replace("_", " "),
      });
    } finally {
      __("submitBtn").innerHTML = "Submit";
      __("submitBtn").disabled = false;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2 flex-col md:flex-row"
      >
        <FormField
          control={form.control}
          name="vehicle_type"
          render={({ field }) => (
            <FormItem className="flex items-center w-full">
              <FormControl>
                <Input
                  placeholder="Vehicle Make"
                  {...field}
                  className="form-input"
                  defaultValue={field?.value}
                  onChange={(e) => setFormData(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <Button
          id="submitBtn"
          type="button"
          disabled={!formData}
          className="md:w-fit w-full"
          onClick={() => handleFormSubmit("vehicle_type")}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
