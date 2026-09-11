import { TestBed } from "@angular/core/testing";
import { describe, expect, it } from "vitest";
import { DataService } from "./data.service";

describe("DataService", () => {
  it("loads published seed articles", () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(DataService);
    expect(
      service.articles().some((article) => article.status === "published"),
    ).toBe(true);
  });
});
