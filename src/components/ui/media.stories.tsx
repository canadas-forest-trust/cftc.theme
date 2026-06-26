import type { Meta, StoryObj } from "@storybook/react";
import { MediaCard } from "./media-card";
import { ArticleCard } from "./article-card";
import { Ribbon } from "./ribbon";
import { Avatar } from "./avatar";
import { Button } from "./button";

const meta: Meta = { title: "Components/Media" };
export default meta;
type Story = StoryObj;

export const Hero: Story = {
  render: () => (
    <div className="max-w-md">
      <MediaCard
        eyebrow="Ottawa Nature Visionary · 2026"
        title="Let's get growing."
        ribbon={<Ribbon tone="gold">Gold</Ribbon>}
        action={<Button variant="link" arrow="right" className="text-inverse">Read the story</Button>}
      />
    </div>
  ),
};

export const Articles: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-5 sm:grid-cols-3">
      <ArticleCard tag="Article" title="Protecting Our Forests" excerpt="Why old-growth matters for carbon and biodiversity." />
      <ArticleCard tag="Article" title="Getting Back to Nature" excerpt="Nature-based solutions for healthier soils." />
      <ArticleCard tag="Art Clip" title="Climate Crisis in a Canadian Context" excerpt="A not-so-rosy look at the data." />
    </div>
  ),
};

export const Ribbons: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="relative size-32 bg-inset">
        <Ribbon tone="gold">Gold</Ribbon>
      </div>
      <div className="relative size-32 bg-inset">
        <Ribbon tone="accent">New</Ribbon>
      </div>
    </div>
  ),
};

export const Avatars: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="SP" size="sm" />
      <Avatar initials="SP" size="md" />
      <Avatar initials="AB" size="lg" tone="ink" />
    </div>
  ),
};
