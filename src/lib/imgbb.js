export const uploadToImgBB = async ({ apiKey, base64Image, fileName }) => {
  const formData = new FormData();
  formData.append("image", base64Image);
  formData.append("name", (fileName || "upload").replace(/\.[^.]+$/, ""));

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    body: formData
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    const message = payload?.error?.message || payload?.data?.error || "Unable to upload image";
    throw new Error(message);
  }

  return {
    id: payload.data.id,
    url: payload.data.display_url,
    deleteUrl: payload.data.delete_url
  };
};
