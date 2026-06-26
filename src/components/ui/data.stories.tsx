import type { Meta, StoryObj } from "@storybook/react";
import { DataList } from "./data-list";
import { DistributionBar } from "./distribution-bar";
import { Legend } from "./legend";
import { StatStrip } from "./stat-strip";

const meta: Meta = { title: "Components/Data" };
export default meta;
type Story = StoryObj;

export const Locations: Story = {
  render: () => (
    <div className="max-w-2xl">
      <DataList
        columns={[
          { key: "location", label: "Location" },
          { key: "trees", label: "Trees", align: "right" },
          { key: "co2", label: "CO₂", align: "right" },
        ]}
        rows={[
          { location: "Porter Cove", trees: "6,000", co2: "748.5 kg" },
          { location: "Doakdown", trees: "3,000", co2: "61.3 kg" },
        ]}
        onRowClick={() => {}}
      />
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <div className="max-w-md">
      <DistributionBar
        items={[
          { label: "W. Spruce", value: 35, color: "var(--color-green-700)" },
          { label: "B. Spruce", value: 25, color: "var(--color-green-800)" },
          { label: "Jack Pine", value: 18, color: "var(--color-ink-900)" },
          { label: "Tamarack", value: 12, color: "var(--color-gold-500)" },
          { label: "Balsam Fir", value: 10, color: "var(--color-green-400)" },
        ]}
      />
    </div>
  ),
};

export const Keys: Story = {
  render: () => (
    <Legend
      items={[
        { label: "White Spruce", color: "var(--color-green-400)" },
        { label: "Black Spruce", color: "var(--color-green-800)" },
      ]}
    />
  ),
};

export const Strip: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <StatStrip
      items={[
        { label: "Seedlings will capture (est.)", value: "61.3", unit: "kg CO₂", tone: "bright" },
        { label: "Total trees contributed", value: "1,000", tone: "bright" },
        { label: "Planting soon", value: "0" },
        { label: "Today in our forest", value: "1.8", unit: "°C" },
      ]}
    />
  ),
};
