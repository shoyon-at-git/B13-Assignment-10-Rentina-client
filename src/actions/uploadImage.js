export const uploadImage = async (imageFile) => {
//   console.log(imageFile);

  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log("IMAGE UPLOAD RESPONSE");

  console.log(data);

  if (!data.success) {
    throw new Error("Image upload failed");
  }

  return data.data.url;
};