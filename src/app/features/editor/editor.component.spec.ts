import { TestBed } from "@angular/core/testing";
import { describe, expect, it } from "vitest";
import { EditorComponent } from "./editor.component";

describe("EditorComponent", () => {
  it("creates", async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(EditorComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
