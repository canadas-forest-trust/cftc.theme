import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Continue" },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = { args: { variant: "solid", arrow: "right" } };
export const Ghost: Story = { args: { variant: "ghost", children: "All marketing assets" } };
export const Link: Story = { args: { variant: "link", children: "Resend code", arrow: "right" } };
export const Download: Story = { args: { variant: "link", children: "Download", arrow: "down" } };

export const IconOnly: Story = {
  args: { iconOnly: true, arrow: "right", children: null, "aria-label": "Submit" },
};

export const Disabled: Story = { args: { variant: "solid", disabled: true, arrow: "right" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="solid" arrow="right">
        Continue
      </Button>
      <Button variant="ghost">All marketing assets</Button>
      <Button variant="link" arrow="right">
        Resend code
      </Button>
      <Button variant="link" arrow="down">
        Download
      </Button>
      <Button iconOnly arrow="right" aria-label="Submit" />
    </div>
  ),
};
