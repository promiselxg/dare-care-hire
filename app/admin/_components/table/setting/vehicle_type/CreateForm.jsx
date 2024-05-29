"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { __ } from "@/utils/getElementById";

const FormSchema = z.object({
  vehicle_type: z.string().min(2),
});

export function NewVehicleTypeForm() {
  const [formData, setFormData] = useState("");
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values) {}

  const handleFormSubmit = async () => {
    if (!formData) return false;

    const submitBtn = __("submitBtn");
    if (!submitBtn) {
      console.error("Submit button not found");
      return;
    }

    try {
      submitBtn.innerHTML = "Please wait...";
      submitBtn.disabled = true;

      const { data } = await axios.post("/api/setting/vehicle_type", {
        formData,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      submitBtn.innerHTML = "Submit";
      submitBtn.disabled = false;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2"
      >
        <FormField
          control={form.control}
          name="vehicle_type"
          render={({ field }) => (
            <FormItem className="flex items-center w-full">
              <FormControl>
                <Input
                  placeholder="Vehicle type"
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
          className="md:w-fit w-full"
          onClick={() => handleFormSubmit()}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
