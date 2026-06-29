import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { QuizCard } from "./quiz-card";
import { CategoryCard } from "./category-card";

const meta: Meta = { title: "Components/Learning" };
export default meta;
type Story = StoryObj;

export const Quiz: Story = {
  render: () => (
    <div className="max-w-2xl">
      <QuizCard
        question="How much carbon dioxide does one tree absorb over its lifetime, on average?"
        answers={[
          { text: "200 kg", isCorrect: false },
          { text: "550 kg", isCorrect: false },
          { text: "1000 kg", isCorrect: true },
          { text: "1900 kg", isCorrect: false },
        ]}
      />
    </div>
  ),
};

export const Categories: Story = {
  render: () => {
    const [active, setActive] = useState("climate");
    const cats = [
      { id: "climate", name: "Climate change & forests", count: 24 },
      { id: "youth", name: "Youth forest corner", count: 11 },
      { id: "indigenous", name: "Forestry & Indigenous communities", count: 18 },
    ];
    return (
      <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
        {cats.map((c) => (
          <CategoryCard key={c.id} name={c.name} count={c.count} active={active === c.id} onClick={() => setActive(c.id)} />
        ))}
      </div>
    );
  },
};
