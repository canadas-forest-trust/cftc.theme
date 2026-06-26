import type { Meta, StoryObj } from "@storybook/react";
import { Eyebrow } from "./components/ui/eyebrow";

const meta: Meta = {
  title: "Foundations/Overview",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

function Swatch({ varName, name }: { varName: string; name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full border border-hairline"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-eyebrow text-xs uppercase tracking-wide text-ink">{name}</span>
        <span className="font-eyebrow text-xs text-muted">{varName}</span>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <Eyebrow as="div">{title}</Eyebrow>
      {children}
    </section>
  );
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <Section title="Semantic · Surfaces">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Swatch varName="--color-bg-canvas" name="Canvas" />
          <Swatch varName="--color-bg-frame" name="Frame" />
          <Swatch varName="--color-bg-panel" name="Panel" />
          <Swatch varName="--color-bg-inset" name="Inset" />
        </div>
      </Section>
      <Section title="Semantic · Ink & Accent">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Swatch varName="--color-text-primary" name="Ink" />
          <Swatch varName="--color-text-muted" name="Muted" />
          <Swatch varName="--color-accent-default" name="Accent" />
          <Swatch varName="--color-accent-bright" name="Accent Bright" />
        </div>
      </Section>
      <Section title="Core · Green scale">
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
          {["900", "800", "700", "600", "500", "400"].map((step) => (
            <Swatch key={step} varName={`--color-green-${step}`} name={`green ${step}`} />
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Eyebrow as="div">Type ramp · Geist / Geist Mono</Eyebrow>
      <div className="flex flex-col gap-6">
        {(["6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg", "base", "sm", "xs"] as const).map((s) => (
          <div key={s} className="flex items-baseline gap-6 border-b border-hairline pb-4">
            <span className="w-16 font-eyebrow text-xs text-muted">{s}</span>
            <span
              className="font-display tracking-tight text-ink leading-none truncate"
              style={{ fontSize: `var(--font-size-${s})` }}
            >
              Forest
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Eyebrow as="div">Spacing scale</Eyebrow>
      {["2", "4", "6", "8", "12", "16", "24"].map((s) => (
        <div key={s} className="flex items-center gap-4">
          <span className="w-10 font-eyebrow text-xs text-muted">{s}</span>
          <div className="h-4 bg-accent" style={{ width: `var(--space-${s})` }} />
        </div>
      ))}
    </div>
  ),
};
