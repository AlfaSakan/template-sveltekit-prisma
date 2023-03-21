import { describe, expect, it } from "vitest";
import { generateHash, verifyHash } from "./hash.util";

describe("hashing string value", () => {
  it("should be able to generate and verify string", async () => {
    const password = "rahasia";

    const hash = await generateHash(password);

    expect(hash).toBeDefined();

    const verify = await verifyHash(hash, password);
    expect(verify).toBe(true);
  });
});
