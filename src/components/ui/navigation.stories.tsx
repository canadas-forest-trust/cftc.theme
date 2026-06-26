import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "./segmented-control";
import { Pagination } from "./pagination";
import { Accordion } from "./accordion";
import { Footer } from "./footer";
import { SectionHeader } from "./section-header";
import { Button } from "./button";
import { Text } from "./text";

const meta: Meta = { title: "Components/Navigation" };
export default meta;
type Story = StoryObj;

export const Segmented: Story = {
  render: () => {
    const [v, setV] = useState("white");
    return (
      <SegmentedControl
        aria-label="Species"
        value={v}
        onChange={setV}
        options={[
          { label: "White Spruce", value: "white" },
          { label: "Black Spruce", value: "black" },
        ]}
      />
    );
  },
};

export const Pages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} pageCount={4} onPageChange={setPage} />;
  },
};

export const NumberedAccordion: Story = {
  render: () => (
    <div className="max-w-sm">
      <Accordion
        items={[
          { number: "01", title: "Page heading", content: <Text>Edit the page title and sub-heading.</Text>, defaultOpen: true },
          { number: "02", title: "Impact data", content: <Text>Choose which figures appear.</Text> },
          { number: "03", title: "Highlight block", content: <Text>Add a featured story.</Text> },
          { number: "04", title: "Contribute & pay", content: <Text>Set pricing and packages.</Text> },
        ]}
      />
    </div>
  ),
};

export const Headers: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="Forest locations"
        action={<Button variant="link" arrow="right">View map</Button>}
        divider
      />
      <SectionHeader
        eyebrow="Brand & partner toolkit"
        title="Marketing Assets"
        action={<Button variant="ghost">All assets</Button>}
      />
    </div>
  ),
};

export const PageFooter: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <Footer
      copyright="© 2026 Canada's Forest Trust Corporation"
      links={[
        { label: "About" },
        { label: "Privacy Policy" },
        { label: "Terms" },
        { label: "FAQ" },
        { label: "Contact" },
      ]}
    />
  ),
};
