import { beforeEach, expect, it, vi } from "vitest";
import path from "path";
import fs from "fs";
import { showError } from "./dom";
import { Window } from "happy-dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();

const document = window.document;

vi.stubGlobal("document", document);

beforeEach(() => {
  document.body.innerHTML = ""
  document.write(htmlDocumentContent);
});
it('Should add an Error paragraph to the id="errors" element ', () => {
  showError("test");

  const errorE1 = document.getElementById("errors");

  const errorParagraph = errorE1.firstElementChild;

  expect(errorParagraph).not.toBeNull();
});

it("should not contain an error paragraph initially", () => {
  const errorE1 = document.getElementById("errors");

  const errorParagraph = errorE1.firstElementChild;

  expect(errorParagraph).toBeNull();
});

it("should output the provided message in the error paragraph",()=>{
    const testErrorMessage = "Test"
    showError("test");
  
    const errorE1 = document.getElementById("errors");
  
    const errorParagraph = errorE1.firstElementChild;
  
    expect(errorParagraph.textContent).not.toBe(testErrorMessage);
})