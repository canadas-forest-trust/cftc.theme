import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./alert";
import { Modal } from "./modal";
import { Button } from "./button";
import { Text } from "./text";

const meta: Meta = { title: "Components/Feedback" };
export default meta;
type Story = StoryObj;

export const Alerts: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-4">
      <Alert tone="info" title="Heads up">
        Your dashboard shows only production data.
      </Alert>
      <Alert tone="warning" title="Direct deposit required">
        You must provide direct deposit information before any fundraiser funds can be disbursed.
      </Alert>
      <Alert tone="success">Your campaign page is live.</Alert>
      <Alert tone="danger" title="Payment failed">
        The card was declined. Try a different payment method.
      </Alert>
    </div>
  ),
};

export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Make this a fundraiser</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          eyebrow="About this feature"
          title="Make this a fundraiser"
          footer={<Button onClick={() => setOpen(false)}>Got it</Button>}
        >
          <Text>
            Set a per-tree markup — the extra amount above the base tree price. Contributors pay the
            combined price; Canada&apos;s Forest Trust handles tree fulfillment.
          </Text>
        </Modal>
      </>
    );
  },
};
