import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WorkQueue } from "./work-queue";

describe("WorkQueue", () => {
  it("renders title, count, and children when count > 0", () => {
    render(
      <WorkQueue title="Qualified leads" count={2} action={<a href="/admin/leads">View leads</a>}>
        <p>Lead cards</p>
      </WorkQueue>,
    );
    expect(screen.getByText("Qualified leads")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Lead cards")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View leads" })).toBeInTheDocument();
  });

  it("hides when empty by default", () => {
    const { container } = render(
      <WorkQueue title="Qualified leads" count={0}>
        <p>Should not show</p>
      </WorkQueue>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("shows empty message when hideWhenEmpty is false", () => {
    render(
      <WorkQueue title="Qualified leads" count={0} hideWhenEmpty={false} emptyMessage="No leads." />,
    );
    expect(screen.getByText("Qualified leads")).toBeInTheDocument();
    expect(screen.getByText("No leads.")).toBeInTheDocument();
  });
});
