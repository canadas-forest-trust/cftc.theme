import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./label";

describe("Label", () => {
  it("renders section labels", () => {
    render(<Label kind="section">Forest locations</Label>);
    expect(screen.getByText("Forest locations")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(
      <Label kind="stat" tone="accent">
        Carbon sequestered
      </Label>,
    );
    expect(screen.getByText("Carbon sequestered")).toBeInTheDocument();
  });
});
