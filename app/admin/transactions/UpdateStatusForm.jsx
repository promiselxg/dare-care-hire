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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { __ } from "@/utils/getElementById";
import axios from "axios";

const FormSchema = z.object({
  transaction_status: z.string(),
});

export function UpdateStatus({ transaction_id, id }) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values) {}

  const handleFormUpdate = async (field, value, transaction_id, id) => {
    if (!value) return false;
    const fieldName = __(field);
    fieldName.innerHTML = "Updating...";
    fieldName.disabled = true;
    try {
      const response = await axios.put("/api/transaction", {
        id,
        transaction_id,
        value,
        field,
      });
      if (response.data.message?.toLowerCase() !== "success") {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1">
        <FormField
          control={form.control}
          name="transaction_status"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="completed">COMPLETED</SelectItem>
                  <SelectItem value="cancelled">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                disabled={!field.value}
                id="transaction_status"
                className="w-full mb-2"
                onClick={() =>
                  handleFormUpdate(
                    "transaction_status",
                    field?.value,
                    transaction_id,
                    id
                  )
                }
              >
                Update
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
