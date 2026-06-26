import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./input";
import { OtpInput } from "./otp-input";
import { Button } from "./button";
import { Eyebrow } from "./eyebrow";

const meta: Meta = { title: "Components/Forms" };
export default meta;
type Story = StoryObj;

export const EmailField: Story = {
  render: () => (
    <div className="flex max-w-sm items-end gap-3">
      <Input
        id="email"
        label="Email address"
        type="email"
        placeholder="name@company.com"
        className="flex-1"
      />
      <Button iconOnly arrow="right" aria-label="Continue" />
    </div>
  ),
};

export const Otp: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col gap-4">
        <Eyebrow as="div">STEP 02 / VERIFY</Eyebrow>
        <OtpInput length={5} onChange={setValue} />
        <Eyebrow tone="muted">Entered: {value || "—"}</Eyebrow>
      </div>
    );
  },
};
