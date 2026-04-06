export interface ImgBBUploadOptions {
  apiKey: string;
  base64Image: string;
  fileName?: string;
}

export async function uploadToImgBB({
  apiKey,
  base64Image,
  fileName,
}: ImgBBUploadOptions): Promise<{
  id: string;
  url: string;
  displayUrl: string;
  deleteUrl: string;
}> {
  const formData = new FormData();
  formData.append("image", base64Image);
  if (fileName) {
    formData.append("name", fileName.replace(/\.[^.]+$/, ""));
  }

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const errorMsg =
      payload?.error?.message || payload?.data?.error || "ImgBB upload failed";
    throw new Error(errorMsg);
  }

  return {
    id: payload.data.id,
    url: payload.data.url,
    displayUrl: payload.data.display_url,
    deleteUrl: payload.data.delete_url,
  };
}
