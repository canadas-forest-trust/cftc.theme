import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Eyebrow } from "./components/ui/eyebrow";
import { Skeleton } from "./components/ui/skeleton";
import "../src/styles/admin.theme.css";

const meta: Meta = {
  title: "Admin/Foundations",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

function Swatch({ varName, name }: { varName: string; name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full border border-hairline rounded-md"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-eyebrow text-xs uppercase tracking-wide text-ink">{name}</span>
        <span className="font-eyebrow text-xs text-muted">{varName}</span>
      </div>
    </div>
  );
}

function AdminPreview({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div data-app="admin" data-theme={theme} className="min-h-screen bg-frame p-8 text-ink font-body">
      {children}
    </div>
  );
}

function AdminColorsPanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <AdminPreview theme={theme}>
      <div className="flex flex-col gap-10 max-w-4xl">
        <Eyebrow as="div">Admin · {theme} · semantic surfaces</Eyebrow>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Swatch varName="--color-bg-canvas" name="Canvas" />
          <Swatch varName="--color-bg-frame" name="Frame" />
          <Swatch varName="--color-bg-panel" name="Panel" />
          <Swatch varName="--color-bg-inset" name="Inset" />
        </div>
        <Eyebrow as="div">Admin · {theme} · accent & status</Eyebrow>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Swatch varName="--color-accent-default" name="Accent" />
          <Swatch varName="--color-text-primary" name="Ink" />
          <Swatch varName="--color-status-success" name="Success" />
          <Swatch varName="--color-status-danger" name="Danger" />
        </div>
      </div>
    </AdminPreview>
  );
}

export const Light: Story = {
  render: () => <AdminColorsPanel theme="light" />,
};

export const Dark: Story = {
  render: () => <AdminColorsPanel theme="dark" />,
};

export const Skeletons: Story = {
  render: () => (
    <AdminPreview theme="light">
      <div className="flex max-w-md flex-col gap-6">
        <Eyebrow as="div">Admin · Skeleton</Eyebrow>
        <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading content">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>
      </div>
    </AdminPreview>
  ),
};

export const ThemeToggle: Story = {
  render: function ThemeToggleStory() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    return (
      <AdminPreview theme={theme}>
        <div className="flex flex-col gap-6 max-w-md">
          <Eyebrow as="div">Admin theme toggle</Eyebrow>
          <div className="flex gap-1 rounded-lg border border-hairline bg-inset p-0.5 w-fit">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`rounded-md px-3 py-1.5 text-sm ${theme === "light" ? "bg-panel border border-hairline" : "text-muted"}`}
            >
              ☀ Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`rounded-md px-3 py-1.5 text-sm ${theme === "dark" ? "bg-panel border border-hairline" : "text-muted"}`}
            >
              ☾ Dark
            </button>
          </div>
          <div className="rounded-lg border border-hairline bg-panel p-6">
            <p className="text-secondary text-sm">
              Panel on <code className="font-eyebrow">bg-frame</code> — IBM Plex Sans + Mono.
            </p>
          </div>
        </div>
      </AdminPreview>
    );
  },
};
