import { describe, it, beforeAll, afterAll } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { readData } from "../src/lib.js";

const fakeData = {
  "fakeOne.txt": "1\n2\n3\n4\n5",
};

Deno.readTextFileSync = (filePath) => fakeData[filePath];
describe("test readData", () => {
  const oldRead = Deno.readTextFileSync;
  beforeAll(() => {
    Deno.readTextFileSync = (filePath) => fakeData[filePath];
  });
  afterAll(() => {
    Deno.readTextFileSync = oldRead;
  });
  it("should return valid file contents when filepath is valid", () => {
    assertEquals(readData("fakeOne.txt"), "1\n2\n3\n4\n5");
  });
});
