import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageHeader } from "./page-header";

describe("PageHeader", () => {
  it("renders the title as an h1", () => {
    render(<PageHeader title="Home" />);
    expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeInTheDocument();
  });

  it("renders eyebrow and description", () => {
    render(
      <PageHeader title="Home" eyebrow="Staff · Platform" description="What needs attention" />,
    );
    expect(screen.getByText("Staff · Platform")).toBeInTheDocument();
    expect(screen.getByText("What needs attention")).toBeInTheDocument();
  });

  it("renders an action", () => {
    render(<PageHeader title="Home" action={<button type="button">Refresh</button>} />);
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });
});
