"use client";

import { ChevronLeft, CloudUpload, Loader2, X } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import "../../cars.css";

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
import { useEffect, useState } from "react";
import Image from "next/image";
import { generateSlug } from "@/utils/generateSlug";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { acceptNumbersOnly } from "@/utils/regExpression";
import { __ } from "@/utils/getElementById";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  vehicle_name: z.string().min(2, {
    message: "Vehicle Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  features: z.string().optional(),
  amount: z.string().min(4, { message: "Please enter a valid amound." }),
  vehicle_type: z.string(),
  vehicle_model: z.string(),
});

const EditCar = ({ params }) => {
  const [selectedImages, setselectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [slug, setSlug] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);

  const { toast } = useToast();
  const router = useRouter();
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
  const renderImages = (source, type) => {
    return source?.map((image, i) => (
      <div
        className="w-full h-[60px] rounded-md relative mb-5   bg-contain"
        key={i}
      >
        {type === "file" && (
          <X
            className="absolute -top-2 -right-2 bg-[rgba(0,0,0,0.9)] rounded-full text-white p-[5px]  cursor-pointer"
            onClick={() => removeSelectedImage(i)}
          />
        )}
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

  async function onSubmit(values) {}

  const handleFormUpdate = async (field, value) => {
    if (!value) return false;
    const fieldName = __(field);
    fieldName.innerHTML = "Updating...";
    try {
      const response = await axios.put("/api/car", {
        id: params?.id,
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
      console.log(error);
    } finally {
      fieldName.innerHTML = "Update";
    }
  };

  const handleImageUpload = async (field, value) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    try {
      const list = await Promise.all(
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
          const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/promiselxg/image/upload`,
            formData
          );
          const { data } = uploadRes;
          return data;
        })
      );
      if (list) {
        __("submitBtn").innerHTML = "Submiting data...";
        const response = await axios.put("/api/car", {
          id: params?.id,
          value,
          field,
          photos: list,
        });
        if (response?.data?.message !== "success") {
          toast({
            variant: "destructive",
            title: "There was a problem with your request.",
            description: `${response?.data?.message}`,
          });
          __("submitBtn").innerHTML = "Update Photo";
        }
        if (response?.data.message === "success") {
          toast({
            title: "Vehicle Images updated successfully.",
          });
          window.location = "/admin/cars/";
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  useEffect(() => {
    const getRecord = async () => {
      if (!params?.id || params.id === "") {
        router.push("/admin/cars");
      }
      try {
        setLoadingData(true);
        const { data } = await axios.get(`/api/car/${params?.id}`);
        if (data?.message === "No Record found with the ID Provided") {
          router.push("/admin/cars");
        }
        setData(data);
        setLoadingData(false);
      } catch (error) {
        setLoadingData(false);
        console.log(error);
      }
    };
    getRecord();
  }, [params.id, router]);

  return (
    <>
      <div className="h-screen w-full flex flex-col  overflow-y-scroll">
        <div className="w-full bg-white h-[60px] p-5 flex items-center border-[#eee] border-b-[1px]">
          <div className="w-fit flex  h-[60px]">
            <Link
              href="/admin/cars"
              className="border-r-[1px] border-[#eee] w-fit flex items-center pr-5"
            >
              <ChevronLeft size={30} />
            </Link>
          </div>
        </div>
        <div className="w-full my-5 bg-[whitesmoke] px-5 flex flex-col h-screen ">
          <div className=" p-5">
            <h1>Edit Vehicle Information</h1>
          </div>
          <div className="p-5 bg-white container w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
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
                          defaultValue={data?.vehicle_name}
                          onKeyUp={() => handleGenerateSlug(field?.value)}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="vehicle_name"
                        onClick={() =>
                          handleFormUpdate("vehicle_name", field?.value)
                        }
                      >
                        Update
                      </Button>
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
                          defaultValue={slug || data?.slug}
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
                          defaultValue={data?.description}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="description"
                        onClick={() =>
                          handleFormUpdate("description", field?.value)
                        }
                      >
                        Update
                      </Button>
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
                          defaultValue={data?.features}
                        />
                      </FormControl>
                      <FormDescription className="text-[12px] text-[#333]">
                        seperated by comma (e.g, AC,Unlimited Milage, etc)
                      </FormDescription>
                      <Button
                        type="button"
                        disabled={!field.value}
                        id="features"
                        onClick={() =>
                          handleFormUpdate("features", field?.value)
                        }
                      >
                        Update
                      </Button>
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
                        <FormLabel>Vehicle type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Vehicle Type"
                                className="form-input"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="peogout">PEOGOUT</SelectItem>
                            <SelectItem value="bus">BUS</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          disabled={!field.value}
                          id="vehicle_type"
                          onClick={() =>
                            handleFormUpdate("vehicle_type", field?.value)
                          }
                        >
                          Update
                        </Button>
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
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="mbw">BMW</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          disabled={!field.value}
                          id="model"
                          onClick={() =>
                            handleFormUpdate("model", field?.value)
                          }
                        >
                          Update
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="db_amount"
                    render={({ field }) => (
                      <FormItem className="md:w-1/2 w-full">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Amount"
                            {...field}
                            className="form-input"
                            id="db_amount"
                            defaultValue={field.value || data?.amount}
                            onKeyUp={() => acceptNumbersOnly("db_amount")}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          disabled={!field.value}
                          id="amount"
                          onClick={() =>
                            handleFormUpdate("amount", parseInt(field?.value))
                          }
                        >
                          Update
                        </Button>
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
                    {selectedImages.length > 0
                      ? renderImages(selectedImages, "file")
                      : renderImages(data?.imgUrl)}
                  </div>
                </div>
                <Button
                  type="button"
                  id="submitBtn"
                  disabled={selectedImages.length < 1}
                  onClick={() => handleImageUpload("image", data?.imageId)}
                >
                  Update Photo
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCar;
