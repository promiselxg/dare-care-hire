import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "promiselxg",
  api_key: "461934834584427",
  api_secret: "_6CMQYh_-86rdqCT1K65DJkYsK4",
  secure: true,
});

//  Remove uploaded image function
const removeUploadedImage = async (imageArray, preset) => {
  const publicIds = imageArray.map((img) => `${preset}/${img}`);
  cloudinary.v2.api
    .delete_resources(publicIds, { type: "upload", resource_type: "image" })
    .then((result) => console.log(result))
    .catch((error) => {
      throw new Error(error);
    });
};

//  upload multiple image function
const cloudinaryImageUploadMethod = async (file, preset) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      { upload_preset: `${preset}` },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        resolve({
          img: result,
        });
      }
    );
  });
};

export { removeUploadedImage, cloudinaryImageUploadMethod };
