import { createId } from "@paralleldrive/cuid2";

export function formErrorHandling(error?: string[]) {
  if (!error) return "";

  return error[0];
}

export function extractExtFromBase64(val: string) {
  return val.split(";")[0].split("/")[1];
}

export function extractExtFromFile(val: File) {
  const arr = val.name.split(".");

  return arr[arr.length - 1];
}

export function generateRandomName() {
  const now = new Date();
  const formatedDate = now.toLocaleDateString("id-ID").replaceAll("/", "-");

  return `${createId()}-${formatedDate}`;
}
