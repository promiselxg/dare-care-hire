"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { __ } from "@/utils/getElementById";
import { useToast } from "@/components/ui/use-toast";
import { acceptNumbersOnly } from "@/utils/regExpression";

const FormSchema = z.object({
  vehicle_type: z.string().min(2),
});

export function VehicleExtraFeaturesForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values) {}

  const handleFormSubmit = async (field) => {
    if (!title || !amount) return false;
    try {
      __("submitBtn").innerHTML = "please wait...";
      __("submitBtn").disabled = true;

      const formData = {
        title,
        amount,
      };
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
          name="extra_feature"
          render={({ field }) => (
            <FormItem className="flex items-center w-full">
              <FormControl>
                <Input
                  placeholder="Feature"
                  {...field}
                  className="form-input"
                  defaultValue={field?.value}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex items-center w-full">
              <FormControl>
                <Input
                  placeholder="Amount"
                  {...field}
                  className="form-input"
                  id="amount"
                  defaultValue={field?.value}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyUp={() => acceptNumbersOnly("amount")}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          id="submitBtn"
          type="button"
          className="md:w-fit w-full"
          disabled={!amount || !title}
          onClick={() => handleFormSubmit("extra_feature")}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
