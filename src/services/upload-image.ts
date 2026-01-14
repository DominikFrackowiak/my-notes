// src/services/upload-image.ts
export async function uploadImage(file: File): Promise<string> {
  const MAX = 5 * 1024 * 1024;

  if (file.size > MAX) {
    throw new Error("Za duży plik (max 5MB).");
  }

  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    throw new Error("Upload failed.");
  }

  const { url } = (await res.json()) as { url: string };
  return url;
}
