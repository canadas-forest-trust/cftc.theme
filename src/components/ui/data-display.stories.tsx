import type { Meta, StoryObj } from "@storybook/react";
import { Stat } from "./stat";
import { ProgressBar } from "./progress-bar";
import { Badge } from "./badge";
import { Panel } from "./panel";
import { Divider } from "./divider";
import { Eyebrow } from "./eyebrow";
import { Text } from "./text";
import { Heading } from "./heading";

const meta: Meta = { title: "Components/Data Display" };
export default meta;
type Story = StoryObj;

export const Stats: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      <Stat label="Carbon sequestered" value="809.73" unit="kg" tone="ink" />
      <Stat label="Seedlings will capture (est.)" value="61.3" unit="kg CO₂" tone="bright" />
      <Stat label="Total trees contributed" value="1,000" tone="bright" />
    </div>
  ),
};

export const Progress: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <ProgressBar label="Planted" valueLabel="4,500" value={75} tone="accent" />
      <ProgressBar label="Planting soon" valueLabel="1,500" value={25} tone="soft" />
    </div>
  ),
};

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="outline">Administrator</Badge>
      <Badge variant="solid">Graphics</Badge>
      <Badge variant="solid">Copy</Badge>
      <Badge variant="soft" dot>
        Test data disabled
      </Badge>
    </div>
  ),
};

export const Panels: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
      <Panel>
        <Eyebrow as="div" className="mb-3">
          Dashboard data
        </Eyebrow>
        <Text>Control whether test data is included in your forest dashboard and reports.</Text>
      </Panel>
      <Panel variant="accent">
        <Heading size="sm" className="mb-1">
          Test data is currently disabled
        </Heading>
        <Text size="sm" tone="muted">
          Your dashboard shows only production data. Test records are excluded from all
          calculations.
        </Text>
      </Panel>
    </div>
  ),
};

export const Dividers: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Divider />
      <Divider tone="strong" />
      <Divider tone="accent" />
    </div>
  ),
};
