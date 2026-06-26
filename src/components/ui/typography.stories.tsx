import type { Meta, StoryObj } from "@storybook/react";
import { Eyebrow } from "./eyebrow";
import { Display } from "./display";
import { Heading } from "./heading";
import { Text } from "./text";

const meta: Meta = { title: "Components/Typography" };
export default meta;
type Story = StoryObj;

export const Eyebrows: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Eyebrow>STEP 01 / IDENTIFY</Eyebrow>
      <Eyebrow tone="ink">IMPACT STATEMENT · FY2026</Eyebrow>
      <Eyebrow tone="accent">OUR FOREST</Eyebrow>
    </div>
  ),
};

export const Displays: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Display size="xl">6,000</Display>
      <Display size="lg">Sign in</Display>
      <Display size="md" tone="bright">
        809.73
      </Display>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading size="lg">How much carbon dioxide does one tree absorb?</Heading>
      <Heading size="md">Browse by category</Heading>
      <Heading size="sm" tone="soft">
        Dashboard data
      </Heading>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Text size="lg">Enter the email associated with your account.</Text>
      <Text>
        Your dashboard shows only production data. Test records are excluded from all calculations.
      </Text>
      <Text size="sm" tone="muted">
        Updated Sep 2026
      </Text>
    </div>
  ),
};
