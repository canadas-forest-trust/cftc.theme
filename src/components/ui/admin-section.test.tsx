import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AdminSection } from "./admin-section";

describe("AdminSection", () => {
  it("renders title and children", () => {
    render(
      <AdminSection title="Needs attention">
        <p>Queue body</p>
      </AdminSection>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Needs attention" })).toBeInTheDocument();
    expect(screen.getByText("Queue body")).toBeInTheDocument();
  });

  it("renders count badge and description", () => {
    render(
      <AdminSection title="Needs attention" count={3} description="Work that blocks go-live">
        <p>Body</p>
      </AdminSection>,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Work that blocks go-live")).toBeInTheDocument();
  });

  it("renders an action", () => {
    render(
      <AdminSection title="Recent" action={<a href="/admin/accounts">View all</a>}>
        <p>List</p>
      </AdminSection>,
    );
    expect(screen.getByRole("link", { name: "View all" })).toBeInTheDocument();
  });
});
