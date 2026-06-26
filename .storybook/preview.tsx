import type { Preview } from "@storybook/react";

// The theme stylesheet pulls in Tailwind v4, the generated token vars, and fonts.
import "../src/styles/theme.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true }, // canvas color comes from the theme tokens
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-canvas text-ink font-body p-8">
        <Story />
      </div>
    ),
  ],
};

export default preview;
