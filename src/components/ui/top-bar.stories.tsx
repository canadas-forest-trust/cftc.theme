import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "./top-bar";

const meta: Meta<typeof TopBar> = {
  title: "Components/TopBar",
  component: TopBar,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof TopBar>;

const CftMark = () => (
  <span className="flex items-center gap-2">
    <span className="grid size-6 grid-cols-4 grid-rows-4 gap-px" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="bg-ink" />
      ))}
    </span>
    <span className="font-eyebrow text-xs uppercase leading-tight tracking-wide text-ink">
      Canada&apos;s
      <br />
      Forest Trust
    </span>
  </span>
);

const PartnerMark = () => (
  <span className="font-eyebrow text-xs uppercase leading-tight tracking-wide text-ink">
    ABC
    <br />
    Corporation
  </span>
);

export const Default: Story = {
  args: {
    cftMark: <CftMark />,
    partnerMark: <PartnerMark />,
    accountInitials: "SP",
    nav: [
      { label: "Our Forest", href: "#", active: true },
      { label: "Learning Centre", href: "#" },
      { label: "Marketing Assets", href: "#" },
    ],
  },
};
