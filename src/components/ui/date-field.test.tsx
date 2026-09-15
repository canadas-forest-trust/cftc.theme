import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { DateField } from "./date-field";

describe("DateField", () => {
  it("renders placeholder when empty", () => {
    render(<DateField label="Start" value="" onChange={() => undefined} />);
    expect(screen.getByRole("button", { name: "Start" })).toHaveTextContent(/select date/i);
  });

  it("formats a selected ISO date", () => {
    render(<DateField label="Start" value="2026-09-14" onChange={() => undefined} />);
    expect(screen.getByRole("button", { name: "Start" })).toHaveTextContent(/sep.*14.*2026/i);
  });

  it("fires onChange when a day is chosen", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateField label="Start" value="2026-09-14" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("button", { name: "2026-09-20" }));
    expect(onChange).toHaveBeenCalledWith("2026-09-20");
  });

  it("clears the value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateField label="Start" value="2026-09-14" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <DateField label="Start" value="2026-09-14" onChange={() => undefined} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
