"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { __ } from "@/utils/getElementById";
import { useToast } from "@/components/ui/use-toast";
import { acceptNumbersOnly } from "@/utils/regExpression";

const FormSchema = z.object({
  extra_feature: z.string().min(2),
  amount: z.string().min(2),
});

export function UpdateVehicleExtraFeaturesForm({ id, vehicle_type, amount }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {}
  const handleFormUpdate = async (field, value, id, btn) => {
    if (!value) return false;
    const fieldName = __(btn);
    fieldName.disabled = true;
    fieldName.innerHTML = "Updating...";
    try {
      const response = await axios.put(`/api/setting/extra_feature`, {
        id: id,
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
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Something went wrong, please try again.",
      });
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
          name="extra_feature"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Feature"
                  {...field}
                  className="form-input"
                  defaultValue={vehicle_type}
                />
              </FormControl>
              <Button
                type="button"
                disabled={!field.value}
                id="extra_feature"
                onClick={() =>
                  handleFormUpdate(
                    "extra_feature",
                    field?.value,
                    id,
                    "extra_feature"
                  )
                }
                className="w-full"
              >
                Update
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Amount"
                  {...field}
                  className="form-input"
                  defaultValue={amount}
                  id="amountx"
                  onKeyUp={() => acceptNumbersOnly("amountx")}
                />
              </FormControl>
              <Button
                type="button"
                id="amountBtn"
                disabled={!field.value}
                onClick={() =>
                  handleFormUpdate(
                    "amount",
                    parseFloat(field.value),
                    id,
                    "amountBtn"
                  )
                }
                className="w-full"
              >
                Update
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
