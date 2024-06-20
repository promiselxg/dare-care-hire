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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { __ } from "@/utils/getElementById";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { acceptNumbersOnly } from "@/utils/regExpression";

const FormSchema = z.object({
  transaction_amount: z
    .string()
    .min(1, { message: "Please enter a valid amount." }),
});

export function UpdateAmount({ transaction_id, id }) {
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
          name="db_amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Amount"
                  {...field}
                  className="form-input"
                  id="db_amount"
                  defaultValue={field.value}
                  onKeyUp={() => acceptNumbersOnly("db_amount")}
                />
              </FormControl>
              <Button
                type="button"
                disabled={!field.value}
                id="transaction_amount"
                className="w-full mb-2"
                onClick={() =>
                  handleFormUpdate(
                    "transaction_amount",
                    parseInt(field?.value, 10),
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
