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
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";
import AuthContext from "@/context/authContext";

const FormSchema = z.object({
  password: z.string({
    required_error: "Required",
  }),
  password1: z.string({
    required_error: "Required.",
  }),
  confirm_password: z.string({
    required_error: "Required.",
  }),
});

const AuthModal = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit({ password1, password, confirm_password }) {
    setLoading(true);
    const formData = {
      confirm_password,
      password,
      password1,
      username: user.username,
    };
    try {
      const resp = await axios.put("/api/auth/login", formData);
      setLoading(false);
      if (resp?.data?.message !== "success") {
        toast({
          title: resp.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Updated successful",
          description:
            "Your password has been updated successfully, changes will take effect when next you login.",
        });
        window.location = window.location;
      }
      //console.log(resp.data.message);
    } catch (error) {
      setLoading(false);
      toast({
        title: error,
      });
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center gap-2 ml-3">
            <KeyRound size={16} />
            <span>Change Password</span>
          </div>
        </DialogTrigger>

        <DialogContent
          className={cn(
            `${barlow.className}  bg-[--secondary-bg] text-[#fff] font-[600]`
          )}
        >
          <DialogHeader>
            <DialogTitle>Change Account Password</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-y-5 flex-col"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Current Password"
                          {...field}
                          type="password"
                          className="w-full p-2 bg-[--primary-bg] outline-none border border-[--primary-text-color] rounded-[5px]  text-[#fff] font-[500]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New Password"
                          {...field}
                          type="password"
                          className="w-full p-2 bg-[--primary-bg] outline-none border border-[--primary-text-color] rounded-[5px]  text-[#fff] font-[500]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm Password"
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
                    disabled={loading}
                    className="bg-[--admin-primary-bg] hover:bg-[#04315f] w-fit transition-all delay-75"
                  >
                    Update Password
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

export default AuthModal;
