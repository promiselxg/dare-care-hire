"use client";

import { ChevronLeft, CloudUpload, Loader2, X } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import "../cars.css";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { generateSlug } from "@/utils/generateSlug";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { acceptNumbersOnly } from "@/utils/regExpression";
import { __ } from "@/utils/getElementById";
import useFetch from "@/hooks/useFetch";
import AuthContext from "@/context/authContext";
import { verifyToken } from "@/utils/verifyToken";
import host from "@/utils/host";

const formSchema = z.object({
  vehicle_name: z.string().min(2, {
    message: "Vehicle Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  features: z.string({ message: "this field is required" }),
  amount: z.string().optional(),
  vehicle_type: z.string(),
  vehicle_model: z.string(),
});

const AddCar = () => {
  const [selectedImages, setselectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const { data, loading: loadingData } = useFetch("/setting/vehicle_type");
  const { data: brandData, loading: loadingBrand } = useFetch(
    "/setting/vehicle_brand"
  );
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  //  Select File to Upload
  const imageHandleChange = (e) => {
    setselectedImages([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const selectedFiles = [];
      filesArray.forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          // File size is bigger than 5MB
          toast({
            variant: "destructive",
            title: "Selected File is > 5MB.",
            description: `File "${file.name}" exceeds 5MB limit.`,
          });
        } else {
          // File size is within the limit
          selectedFiles.push(file);
        }
      });
      setFiles(selectedFiles);
      const fileArray = selectedFiles.map((file) => URL.createObjectURL(file));
      setselectedImages((prevImages) => prevImages.concat(fileArray));
      selectedFiles.forEach((file) => URL.revokeObjectURL(file));
    }
  };
  //  Remove an Item from an Array
  const removeSelectedImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setselectedImages(updatedImages);
  };
  //  Display the selected Item
  const renderImages = (source) => {
    return source.map((image, i) => (
      <div
        className="w-full h-[60px] rounded-md relative mb-5   bg-contain"
        key={i}
      >
        <X
          className="absolute -top-2 -right-2 bg-[rgba(0,0,0,0.9)] rounded-full text-white p-[5px]  cursor-pointer"
          onClick={() => removeSelectedImage(i)}
        />
        <Image
          src={image}
          alt={`images ${i}`}
          width={200}
          height={100}
          className="object-contain h-[60px]"
        />
      </div>
    ));
  };

  // Generate Slug
  const handleGenerateSlug = (text) => {
    setSlug(generateSlug(text));
  };

  // async function onSubmit(values) {
  //   setLoading(true);
  //   const timestamp = Math.round(new Date().getTime() / 1000);
  //   if (
  //     !values.vehicle_name ||
  //     !values.description ||
  //     !slug ||
  //     !values.vehicle_type ||
  //     !values.vehicle_model ||
  //     !values.features
  //   ) {
  //     setLoading(false);
  //     toast({
  //       variant: "destructive",
  //       title: "Please fill out the rquired fields.",
  //       description: "There was a problem with your request.",
  //     });
  //   }
  //   try {
  //     setLoading(true);
  //     if(selectedImages.length > 0){
  //       const list = await Promise.all(
  //         Object.values(files).map(async (file) => {
  //           const formData = new FormData();
  //           formData.append("file", file);
  //           formData.append("upload_preset", "dareCarHire");
  //           formData.append("timestamp", timestamp);
  //           formData.append(
  //             "api_key",
  //             process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
  //           );
  //           __("submitBtn").innerHTML = "Uploading Image...";
  //           const uploadRes = await axios.post(
  //             `https://api.cloudinary.com/v1_1/promiselxg/image/upload`,
  //             formData
  //           );

  //           const { data } = uploadRes;
  //           return data;
  //         })
  //       );
  //     }else{
  //       __("submitBtn").innerHTML = "Submiting data...";
  //       const data = {
  //         values,
  //         slug,
  //         photos: list,
  //       };
  //       const response = await axios.post("/api/car", data);
  //       if (response?.data?.message !== "success") {
  //         toast({
  //           variant: "destructive",
  //           title: "There was a problem with your request.",
  //           description: `${response.data.message}`,
  //         });
  //       }
  //       if (response?.data.message === "success") {
  //         toast({
  //           title: "New Record created successfully.",
  //           description: `${values.vehicle_name} created successfully.`,
  //         });
  //         window.location = `/admin/cars?q=${user?.token}`;
  //       }
  //     }

  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Uh oh! Something went wrong.",
  //       description: "There was a problem with your request.",
  //     });
  //   } finally {
  //     __("submitBtn").innerHTML = "Submit";
  //     setLoading(false);
  //   }
  // }
  async function onSubmit(values) {
    setLoading(true);
    const timestamp = Math.round(new Date().getTime() / 1000);

    const requiredFields = [
      values.vehicle_name,
      values.description,
      slug,
      values.vehicle_type,
      values.vehicle_model,
      values.features,
    ];

    if (requiredFields.some((field) => !field)) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Please fill out the required fields.",
        description: "There was a problem with your request.",
      });
      return;
    }

    try {
      setLoading(true);
      let photos = [];

      if (selectedImages.length > 0) {
        photos = await Promise.all(
          Object.values(files).map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "dareCarHire");
            formData.append("timestamp", timestamp);
            formData.append(
              "api_key",
              process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
            );
            __("submitBtn").innerHTML = "Uploading Image...";
            const { data } = await axios.post(
              `https://api.cloudinary.com/v1_1/promiselxg/image/upload`,
              formData
            );
            return data;
          })
        );
      }

      __("submitBtn").innerHTML = "Submitting data...";
      const data = {
        values,
        slug,
        photos,
      };

      const response = await axios.post("/api/car", data);

      if (response?.data?.message !== "success") {
        toast({
          variant: "destructive",
          title: "There was a problem with your request.",
          description: `${response.data.message}`,
        });
        return;
      }

      toast({
        title: "New Record created successfully.",
        description: `${values.vehicle_name} created successfully.`,
      });
      window.location = `/admin/cars?q=${user?.token}`;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      __("submitBtn").innerHTML = "Submit";
      setLoading(false);
    }
  }

  useEffect(() => {
    const verifyServerToken = async () => {
      const res = await verifyToken(user?.token);
      if (res.message !== "success") {
        window.location = `${host.host_url}/login`;
      }
    };
    verifyServerToken();
  }, [user?.token]);

  return (
    <>
      <div className="h-screen w-full flex flex-col  overflow-y-scroll">
        <div className="w-full bg-white h-[60px] p-5 flex items-center border-[#eee] border-b-[1px]">
          <div className="w-fit flex  h-[60px]">
            <Link
              href={`/admin/cars?q=${user?.token}`}
              className="border-r-[1px] border-[#eee] w-fit flex items-center pr-5"
            >
              <ChevronLeft size={30} />
            </Link>
          </div>
        </div>
        <div className="w-full my-5 bg-[whitesmoke] px-5 flex flex-col h-screen ">
          <div className=" p-5">
            <h1>New Vehicle</h1>
          </div>
          <div className="p-5 bg-white container w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 mb-20"
              >
                <FormField
                  control={form.control}
                  name="vehicle_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Vehicle Name"
                          {...field}
                          className="form-input"
                          onKeyUp={() => handleGenerateSlug(field?.value)}
                        />
                      </FormControl>
                      <FormDescription>Vehicle Name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="slug"
                          {...field}
                          disabled
                          defaultValue={slug}
                        />
                      </FormControl>
                      <FormDescription className="text-[12px] text-[#333]">
                        This is field is auto-generated
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Features"
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormDescription className="text-[12px] text-[#333]">
                        seperated by comma (e.g, AC,Unlimited Milage, etc)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full flex items-center gap-5 flex-col md:flex-row ">
                  <FormField
                    control={form.control}
                    name="vehicle_type"
                    render={({ field }) => (
                      <FormItem className="md:w-1/2 w-full">
                        <FormLabel>Car Make</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={loadingData}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Car Make"
                                className="form-input"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data?.map((item) => {
                              return (
                                <SelectItem
                                  value={item?.vehicle_type
                                    ?.toLowerCase()
                                    .replace(" ", "_")}
                                  key={item.id}
                                >
                                  {item?.vehicle_type?.toUpperCase()}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicle_model"
                    render={({ field }) => (
                      <FormItem className="md:w-1/2 w-full">
                        <FormLabel>Car Model</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={loadingBrand}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Car Model"
                                className="form-input"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brandData?.map((item) => {
                              return (
                                <SelectItem
                                  value={item?.vehicle_brand
                                    ?.toLowerCase()
                                    .replace(" ", "_")}
                                  key={item?.id}
                                >
                                  {item?.vehicle_brand?.toUpperCase()}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="md:w-1/2 w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Amount"
                            {...field}
                            className="form-input"
                            id="amount"
                            defaultValue={field.value}
                            onKeyUp={() => acceptNumbersOnly("amount")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-5">
                  <span>Add Photo</span>
                  <label htmlFor="files" className="w-fit ">
                    <CloudUpload
                      size={60}
                      color="#171726"
                      className="cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    name="files"
                    id="files"
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                    onChange={imageHandleChange}
                    className="hidden"
                  />

                  <div className="w-full grid md:grid-cols-10 grid-cols-3 gap-3">
                    {selectedImages && renderImages(selectedImages)}
                  </div>
                </div>
                <Button
                  type="submit"
                  id="submitBtn"
                  className="w-full md:w-fit"
                  disabled={loading || !slug}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCar;
