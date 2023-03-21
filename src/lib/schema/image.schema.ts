import { z } from "zod";

export const imageSchema = z
  .instanceof(File)
  .refine((value) => value.size < 3000000, {
    message: "ukuran file lebih dari 3Mb",
  });
