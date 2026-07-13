import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./components/ui/page-header";
import { AdminSection } from "./components/ui/admin-section";
import { WorkQueue } from "./components/ui/work-queue";
import { StatStrip } from "./components/ui/stat-strip";
import { DataList } from "./components/ui/data-list";
import { DataListLink } from "./components/ui/data-list-link";
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
          <DataList
            primaryColumn="org"
            columns={[
              { key: "org", label: "Organization" },
              { key: "type", label: "Type" },
              { key: "status", label: "Status" },
            ]}
            rows={[
              {
                org: <DataListLink href="#lead">Evergreen Forestry</DataListLink>,
                type: "Corporate",
                status: <Badge variant="soft">Qualified</Badge>,
              },
            ]}
            onRowClick={() => {}}
          />
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
          <DataList
            primaryColumn="forest"
            columns={[
              { key: "forest", label: "Smart Forest" },
              { key: "account", label: "Account" },
              { key: "issues", label: "Issues" },
            ]}
            rows={[
              {
                forest: <DataListLink href="#forest">ABC Smart Forest</DataListLink>,
                account: <DataListLink href="#account">Acme</DataListLink>,
                issues: "Not published",
              },
              {
                forest: <DataListLink href="#forest">XYZ Community Forest</DataListLink>,
                account: <DataListLink href="#account">Northwind</DataListLink>,
                issues: "Missing unique code",
              },
            ]}
            onRowClick={() => {}}
          />
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
        <DataList
          primaryColumn="org"
          columns={[
            { key: "org", label: "Organization" },
            { key: "stage", label: "Stage" },
          ]}
          rows={[
            {
              org: <DataListLink href="#account">Evergreen Forestry</DataListLink>,
              stage: <Badge variant="soft">Active</Badge>,
            },
          ]}
          onRowClick={() => {}}
        />
      </AdminSection>
    </AdminPreview>
  ),
};
