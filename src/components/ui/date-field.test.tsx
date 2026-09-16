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

  it("does not commit until Accept", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateField label="Start" value="2026-09-14" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("button", { name: "2026-09-20" }));
    expect(onChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /accept/i }));
    expect(onChange).toHaveBeenCalledWith("2026-09-20");
  });

  it("Cancel discards the draft", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateField label="Start" value="2026-09-14" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("button", { name: "2026-09-20" }));
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("clears the draft then Accept commits empty", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DateField label="Start" value="2026-09-14" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Start" }));
    await user.click(screen.getByRole("button", { name: /clear/i }));
    await user.click(screen.getByRole("button", { name: /accept/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <DateField label="Start" value="2026-09-14" onChange={() => undefined} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
