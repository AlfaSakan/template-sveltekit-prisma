import { describe, expect, it } from "vitest";
import {
  extractExtFromBase64,
  extractExtFromFile,
  formErrorHandling,
  generateRandomName,
} from "./string.util";

describe("errorHandling", () => {
  it("should be able get error", () => {
    const value = formErrorHandling(["error"]);
    expect(value).toBe("error");
  });

  it("should be able not get error when param undefined", () => {
    const value = formErrorHandling();
    expect(value).toBe("");
  });
});

describe("extractExtFromBase64", () => {
  it("should be able get extension from base64", () => {
    const value = extractExtFromBase64("aksn/jpg;claknsclk");
    expect(value).toBe("jpg");
  });
});

describe("extractExtFromFile", () => {
  it("should be able get extension from File", () => {
    const blob = new Blob([""], { type: "text/html" });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    blob["lastModifiedDate"] = "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    blob["name"] = "filename.html";

    const fakeF = <File>blob;

    const value = extractExtFromFile(fakeF);
    expect(value).toBe("html");
  });
});

describe("generateRandomName", () => {
  it("should return random string", () => {
    const value = generateRandomName();

    expect(value.length).toBeGreaterThan(0);
  });
});
