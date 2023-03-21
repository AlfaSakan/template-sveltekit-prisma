export async function fileImageToBase64(
  file: File,
  onload?: (ev: ProgressEvent<FileReader>) => Promise<void>,
  onerror?: (ev: ProgressEvent<FileReader>) => void
) {
  const reader = new FileReader();

  if (onload) {
    reader.onload = onload;
  }

  if (onerror) {
    reader.onerror = onerror;
  }

  reader.readAsDataURL(file);
}
