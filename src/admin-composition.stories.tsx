import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./components/ui/page-header";
import { AdminSection } from "./components/ui/admin-section";
import { WorkQueue } from "./components/ui/work-queue";
import { StatStrip } from "./components/ui/stat-strip";
import { Panel } from "./components/ui/panel";
import { Text } from "./components/ui/text";
import { Badge } from "./components/ui/badge";
import "./styles/admin.theme.css";

const meta: Meta = {
  title: "Admin/Composition",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

function AdminPreview({ children }: { children: React.ReactNode }) {
  return (
    <div data-app="admin" data-theme="light" className="min-h-screen bg-frame p-8 text-ink font-body">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">{children}</div>
    </div>
  );
}

export const HomeBands: Story = {
  render: () => (
    <AdminPreview>
      <PageHeader
        eyebrow="Staff · Platform"
        title="Home"
        description="What needs attention"
      />

      <AdminSection title="Needs attention" count={3} description="Work that blocks go-live or partner setup">
        <WorkQueue
          title="Qualified leads"
          count={1}
          action={
            <a href="#leads" className="text-sm font-medium text-accent hover:text-accent-strong">
              View leads →
            </a>
          }
        >
          <Panel variant="inset" className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Text tone="ink">Evergreen Forestry</Text>
              <Text size="sm" tone="muted">
                Corporate · Qualified
              </Text>
            </div>
            <a href="#review" className="text-sm font-medium text-accent hover:text-accent-strong">
              Review →
            </a>
          </Panel>
        </WorkQueue>

        <WorkQueue
          title="Smart Forests not ready"
          count={2}
          action={
            <a href="#forests" className="text-sm font-medium text-accent hover:text-accent-strong">
              All Smart Forests →
            </a>
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Panel variant="inset" className="flex flex-col gap-2">
              <Text tone="ink">ABC Smart Forest</Text>
              <div className="flex flex-wrap gap-2">
                <Badge variant="soft">Not published</Badge>
              </div>
            </Panel>
            <Panel variant="inset" className="flex flex-col gap-2">
              <Text tone="ink">XYZ Community Forest</Text>
              <div className="flex flex-wrap gap-2">
                <Badge variant="soft">Missing unique code</Badge>
              </div>
            </Panel>
          </div>
        </WorkQueue>

        <WorkQueue title="Onboarding stuck" count={0} hideWhenEmpty />
      </AdminSection>

      <AdminSection
        title="At a glance"
        action={
          <a href="#platform" className="text-sm font-medium text-accent hover:text-accent-strong">
            System health →
          </a>
        }
      >
        <StatStrip
          density="compact"
          items={[
            { label: "Unrouted", value: 0 },
            { label: "Unbilled trees", value: 120, tone: "bright" },
            { label: "Unsited trees", value: 40, tone: "bright" },
            { label: "Unpublished forests", value: 2, tone: "bright" },
            { label: "Missing code", value: 1 },
          ]}
        />
      </AdminSection>

      <AdminSection
        title="Recent accounts"
        action={
          <a href="#accounts" className="text-sm font-medium text-accent hover:text-accent-strong">
            View all →
          </a>
        }
      >
        <Text size="sm" tone="muted">
          DataList goes here on the live dashboard.
        </Text>
      </AdminSection>
    </AdminPreview>
  ),
};
