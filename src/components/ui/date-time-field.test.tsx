import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DateTimeField } from "./date-time-field";

describe("DateTimeField", () => {
  it("formats a selected datetime", () => {
    render(
      <DateTimeField label="Starts" value="2026-09-14T14:30" onChange={() => undefined} />,
    );
    expect(screen.getByRole("button", { name: "Starts" })).toHaveTextContent(
      /sep.*14.*2026.*14:30/i,
    );
  });

  it("commits on Accept after picking a day", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DateTimeField label="Starts" value="2026-09-14T14:30" onChange={onChange} />,
    );
    await user.click(screen.getByRole("button", { name: "Starts" }));
    await user.click(screen.getByRole("button", { name: "2026-09-20" }));
    expect(onChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /accept/i }));
    expect(onChange).toHaveBeenCalledWith("2026-09-20T14:30");
  });
});
