import { supabase } from "./supabase-factory";

const BUCKET_NAME = "test";

export async function uploadFile(file: File, path: string) {
  if (!(file instanceof File)) {
    throw new Error("uploadFile: Provided file is not a File object");
  }

  let fileToUpload = file;

  // Only recreate the File if type is missing or size is suspiciously small
  if (!file.type || file.size < 10) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const mimeMap: Record<string, string> = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      mp4: "video/mp4",
      pdf: "application/pdf",
      txt: "text/plain",
      csv: "text/csv",
    };
    const mimeType = mimeMap[ext] || "application/octet-stream";

    // Read the actual content to ensure it’s not empty
    const buffer = await file.arrayBuffer();
    if (buffer.byteLength === 0) {
      throw new Error("File content is empty, cannot upload broken file");
    }

    fileToUpload = new File([buffer], file.name, { type: mimeType });
  }
  const fileName = fileToUpload.name.replace(/\s+/g, "-");

  const uniqueFileName = `${Date.now()}-${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(`${path}/${uniqueFileName}`, fileToUpload, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error.message);
    throw error;
  }

  const { data: publicData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(`${path}/${uniqueFileName}`);

  if (!publicData?.publicUrl) {
    throw new Error("Failed to get public URL for the uploaded file");
  }

  return publicData.publicUrl;
}
