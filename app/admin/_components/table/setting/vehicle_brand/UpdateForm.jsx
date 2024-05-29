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
import axios from "axios";
import { __ } from "@/utils/getElementById";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  vehicle_type: z.string().min(2),
});

export function UpdateVehicleBrandForm({ id, vehicle_type }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {}
  const handleFormUpdate = async (field, value, id) => {
    if (!field || !value || !id) {
      return false;
    }
    try {
      __(field).innerHTML = "updating...";
      __(field).disabled = true;
      const formData = {
        field,
        value,
        id,
      };
      const { data } = await axios.put(`/api/setting/${field}`, {
        formData,
      });
      if (data?.message?.toLowerCase() !== "success") {
        toast({
          variant: "destructive",
          title: "An Error occured",
          description: `${data?.message}`,
        });
      } else {
        toast({
          title: "Updated successfully.",
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An Error occured",
        description: `An unknown error occured while trying to update this field.`,
      });
    } finally {
      __(field).innerHTML = "Update";
      __(field).disabled = false;
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1">
        <FormField
          control={form.control}
          name="vehicle_brand"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Brand"
                  {...field}
                  className="form-input"
                  defaultValue={vehicle_type}
                />
              </FormControl>
              <Button
                type="button"
                disabled={!field.value}
                id="vehicle_brand"
                onClick={() =>
                  handleFormUpdate("vehicle_brand", field?.value, id)
                }
                className="w-full"
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
