import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";
import { Switch } from "./switch";
import { CopyField } from "./copy-field";
import { Input } from "./input";
import { ColorField } from "./color-field";
import { FileUpload } from "./file-upload";
import { Slider } from "./slider";

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

export const Radios: Story = {
  render: () => {
    const [correct, setCorrect] = useState("b");
    return (
      <div className="flex max-w-md flex-col gap-3">
        <Radio
          name="correct-answer"
          label="1000 kg"
          value="a"
          checked={correct === "a"}
          onChange={() => setCorrect("a")}
        />
        <Radio
          name="correct-answer"
          label="Correct answer — 550 kg"
          value="b"
          checked={correct === "b"}
          onChange={() => setCorrect("b")}
        />
        <Radio
          name="correct-answer"
          label="200 kg"
          value="c"
          checked={correct === "c"}
          onChange={() => setCorrect("c")}
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

export const Colour: Story = {
  render: () => {
    const [hex, setHex] = useState("#1B6A3E");
    return (
      <div className="max-w-md">
        <ColorField
          label="Accent colour"
          value={hex}
          onChange={setHex}
          presets={["#1B6A3E", "#0A3D2A", "#B46A3A", "#17150F"]}
        />
      </div>
    );
  },
};

export const Upload: Story = {
  render: () => {
    const [name, setName] = useState<string | undefined>();
    return (
      <div className="max-w-md">
        <FileUpload
          label="Hero image"
          accept="image/*"
          fileName={name}
          hint="JPG, PNG, or WebP"
          onFileChange={(files) => setName(files?.[0]?.name)}
        />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [score, setScore] = useState(40);
    return (
      <div className="max-w-md">
        <Slider
          label="Minimum score"
          value={score}
          min={0}
          max={100}
          valueLabel={`${score}%`}
          onValueChange={setScore}
        />
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
