import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { Checkbox } from "./checkbox";
import { Switch } from "./switch";
import { CopyField } from "./copy-field";
import { Input } from "./input";

const meta: Meta = { title: "Components/Forms Extended" };
export default meta;
type Story = StoryObj;

export const BoxInputs: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-5">
      <Input variant="box" label="Heading" defaultValue="Grow a forest with ABC Corp" />
      <Input variant="box" label="Card number" placeholder="•••• •••• •••• ••••" />
      <Input variant="box" label="Email" error="Enter a valid email address" defaultValue="nope" />
    </div>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <div className="max-w-md">
      <Textarea
        label="Sub-heading"
        defaultValue="Every tree you contribute is planted in a real Canadian Smart Forest™ and tracked for life."
        rows={4}
      />
    </div>
  ),
};

export const Dropdown: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-5">
      <Select
        label="Asset type"
        options={[
          { label: "All marketing assets", value: "all" },
          { label: "Graphics", value: "graphics" },
          { label: "Copy", value: "copy" },
        ]}
      />
      <Select
        variant="filter"
        aria-label="Filter"
        options={[{ label: "All marketing assets", value: "all" }]}
      />
    </div>
  ),
};

export const Checkboxes: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="max-w-md">
        <Checkbox
          label="Include test data in dashboard"
          description="Test records are normally excluded from all calculations."
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    );
  },
};

export const Switches: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div className="flex items-center gap-4">
        <Switch checked={on} onCheckedChange={setOn} aria-label="Enable fundraiser" />
        <span className="font-eyebrow text-xs uppercase tracking-wide text-ink">
          Fundraiser {on ? "on" : "off"}
        </span>
      </div>
    );
  },
};

export const Copy: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <CopyField label="Copy public link" value="https://my.canadasforesttrust.ca/mypage" />
      <CopyField
        label="Embed"
        multiline
        value={'<iframe src="https://my.canadasforesttrust.ca/mypage" width="100%" height="900" frameborder="0"></iframe>'}
      />
    </div>
  ),
};
