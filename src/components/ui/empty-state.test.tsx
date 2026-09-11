import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No forests yet" />);
    expect(screen.getByText("No forests yet")).toBeInTheDocument();
  });

  it("renders body and action", () => {
    render(
      <EmptyState
        title="Nothing matches"
        body="Try a different search."
        action={<button type="button">Reset</button>}
      />,
    );
    expect(screen.getByText("Try a different search.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("renders ReactNode body", () => {
    render(
      <EmptyState
        title="Empty"
        body={
          <span>
            See <a href="/help">help</a>
          </span>
        }
      />,
    );
    expect(screen.getByRole("link", { name: "help" })).toHaveAttribute("href", "/help");
  });
});
