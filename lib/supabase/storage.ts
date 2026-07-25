import { createClient } from "@/lib/supabase/client";

// Client-side upload helper shared by the blog/project/certification admin
// editors — runs in the browser so it uses the signed-in admin's session
// cookies (RLS policy storage_admin_write in supabase/schema.sql).
export async function uploadToBucket(
  bucket: string,
  file: File,
  pathPrefix = "",
) {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `${pathPrefix}${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
