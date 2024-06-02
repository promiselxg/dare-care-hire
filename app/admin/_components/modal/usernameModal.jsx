import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { barlow } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import AuthContext from "@/context/authContext";
import { __ } from "@/utils/getElementById";

const FormSchema = z.object({
  new_username: z.string({
    required_error: "Required",
  }),
  password: z.string({
    required_error: "Required.",
  }),
});

const UsernameModal = () => {
  const { toast } = useToast();
  const { user, handleLogOut } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit({ new_username, password }) {
    const formData = {
      new_username,
      password,
      username: user.username,
      type: "username",
    };
    try {
      __("submitBtn").innerHTML = "please wait...";
      __("submitBtn").disabled = true;
      const resp = await axios.put("/api/auth/setting", formData);
      if (resp?.data?.message !== "success") {
        toast({
          title: resp.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Username Updated successful",
          description:
            "Your Username has been updated successfully, changes will take effect when next you login.",
        });
        handleLogOut();
      }
      //console.log(resp.data.message);
    } catch (error) {
      toast({
        title: error,
      });
    } finally {
      __("submitBtn").innerHTML = "Update Username";
      __("submitBtn").disabled = false;
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center gap-2 ml-3">
            <User size={16} />
            <span>Change Username</span>
          </div>
        </DialogTrigger>

        <DialogContent
          className={cn(
            `${barlow.className}  bg-[--secondary-bg] text-[#fff] font-[600]`
          )}
        >
          <DialogHeader>
            <DialogTitle>Change Account Username</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-y-5 flex-col"
              >
                <FormField
                  control={form.control}
                  name="new_username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New Username"
                          {...field}
                          type="text"
                          className="w-full p-2 bg-[--primary-bg] outline-none border border-[--primary-text-color] rounded-[5px]  text-[#fff] font-[500]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          {...field}
                          type="password"
                          className="w-full p-2 bg-[--primary-bg] outline-none border border-[--primary-text-color] rounded-[5px]  text-[#fff] font-[500]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button
                    type="submit"
                    id="submitBtn"
                    className="bg-[--admin-primary-bg] hover:bg-[#04315f] w-fit transition-all delay-75"
                  >
                    Update Username
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsernameModal;
