import { useState } from "react";
import { cn } from "../../lib/cn";
import { Eyebrow } from "./eyebrow";
import { Heading } from "./heading";

export interface QuizAnswer {
  text: string;
  isCorrect: boolean;
}

export interface QuizCardProps {
  eyebrow?: string;
  question: string;
  answers: QuizAnswer[];
  /** Dark panel treatment (idle answers stay translucent; correct/wrong still reveal). */
  tone?: "default" | "inverse";
  /** Fires once an answer is chosen. */
  onAnswer?: (index: number, correct: boolean) => void;
}

/**
 * QuizCard — a knowledge question with multiple-choice answers. On pick, the
 * correct answer turns accent and a wrong pick turns danger; choices then lock.
 */
export function QuizCard({
  eyebrow = "Test your knowledge",
  question,
  answers,
  tone = "default",
  onAnswer,
}: QuizCardProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const inverse = tone === "inverse";

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    onAnswer?.(i, answers[i].isCorrect);
  };

  return (
    <div className="flex flex-col gap-4">
      <Eyebrow as="div" className={inverse ? "text-inverse/70" : undefined}>
        {eyebrow}
      </Eyebrow>
      <Heading size="lg" className={inverse ? "text-inverse" : undefined}>
        {question}
      </Heading>
      <div className="grid gap-3 sm:grid-cols-2">
        {answers.map((a, i) => {
          const revealed = picked !== null;
          const state = !revealed
            ? "idle"
            : a.isCorrect
              ? "correct"
              : picked === i
                ? "wrong"
                : "idle";
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={revealed}
              className={cn(
                "border px-4 py-3 text-left font-body text-base transition-colors",
                state === "correct" && "border-accent bg-active text-ink",
                state === "wrong" && "border-danger text-danger",
                state === "idle" &&
                  (inverse
                    ? "border-inverse/30 bg-transparent text-inverse"
                    : "border-field bg-panel text-ink"),
                !revealed &&
                  (inverse ? "hover:border-inverse/60 cursor-pointer" : "hover:border-line-strong cursor-pointer"),
                revealed && "cursor-default",
              )}
            >
              {a.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
