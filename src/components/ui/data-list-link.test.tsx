import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DataListLink } from "./data-list-link";

describe("DataListLink", () => {
  it("renders an anchor with href", () => {
    render(<DataListLink href="/admin/accounts/1">Acme</DataListLink>);
    const link = screen.getByRole("link", { name: "Acme" });
    expect(link).toHaveAttribute("href", "/admin/accounts/1");
  });

  it("stops click propagation so row handlers do not fire", async () => {
    const user = userEvent.setup();
    const onRow = vi.fn();
    const onLink = vi.fn();
    render(
      <div role="button" tabIndex={0} onClick={onRow}>
        <DataListLink href="/x" onClick={onLink}>
          Entity
        </DataListLink>
      </div>,
    );
    await user.click(screen.getByRole("link", { name: "Entity" }));
    expect(onLink).toHaveBeenCalled();
    expect(onRow).not.toHaveBeenCalled();
  });

  it("supports a custom element via as", () => {
    function FakeLink({ href, children, ...rest }: { href: string; children: React.ReactNode }) {
      return (
        <a data-fake="" href={href} {...rest}>
          {children}
        </a>
      );
    }
    render(
      <DataListLink as={FakeLink} href="/y">
        Custom
      </DataListLink>,
    );
    expect(screen.getByRole("link", { name: "Custom" })).toHaveAttribute("data-fake", "");
  });
});
