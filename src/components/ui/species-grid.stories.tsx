import type { Meta, StoryObj } from "@storybook/react";
import { SpeciesGrid } from "./species-grid";

const meta: Meta<typeof SpeciesGrid> = { title: "Components/SpeciesGrid", component: SpeciesGrid };
export default meta;
type Story = StoryObj<typeof SpeciesGrid>;

export const Default: Story = {
  render: () => (
    <SpeciesGrid
      species={[
        { name: "White Spruce", color: "#6FBE93", percent: 35, description: "A medium-sized evergreen conifer with a conical shape and smooth grey bark." },
        { name: "Black Spruce", color: "#16482A", percent: 25, description: "A slow-growing boreal conifer that thrives in wet, peaty soils." },
        { name: "Jack Pine", color: "#17150F", percent: 18, description: "A hardy pioneer species; its cones open after fire." },
        { name: "Tamarack", color: "#B46A3A", percent: 12, description: "A deciduous conifer — its needles turn gold and drop in autumn." },
        { name: "Balsam Fir", color: "#34A06B", percent: 10, description: "A fragrant fir common across the Canadian boreal." },
      ]}
    />
  ),
};
