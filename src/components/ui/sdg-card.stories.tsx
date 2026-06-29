import type { Meta, StoryObj } from "@storybook/react";
import { SdgCard } from "./sdg-card";

const meta: Meta<typeof SdgCard> = { title: "Components/SdgCard", component: SdgCard };
export default meta;
type Story = StoryObj<typeof SdgCard>;

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <SdgCard goal={15} title="Life on Land" color="#56C02B" href="#" />
      <SdgCard goal={13} title="Climate Action" color="#3F7E44" href="#" />
      <SdgCard goal={8} title="Decent Work & Growth" color="#A21942" href="#" />
      <SdgCard goal={10} title="Reduced Inequalities" color="#DD1367" href="#" />
    </div>
  ),
};
