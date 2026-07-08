import { useRef, useState } from "react";

export interface OtpInputProps {
  length?: number;
  /** Fires on every change with the current joined value. */
  onChange?: (value: string) => void;
  /** Fires when all cells are filled. */
  onComplete?: (value: string) => void;
  "aria-label"?: string;
}

/**
 * OtpInput — the boxed single-digit cells from the verify step. Square cells,
 * hairline borders, active cell border-accent. Token-driven, keyboard-friendly.
 */
export function OtpInput({
  length = 5,
  onChange,
  onComplete,
  "aria-label": ariaLabel = "Verification code",
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const emit = (next: string[]) => {
    const value = next.join("");
    onChange?.(value);
    if (value.length === length && !next.includes("")) onComplete?.(value);
  };

  const setAt = (i: number, char: string) => {
    const next = [...digits];
    next[i] = char;
    setDigits(next);
    emit(next);
  };

  const handleChange = (i: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    setAt(i, char);
    if (char && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const next = Array(length)
      .fill("")
      .map((_, idx) => pasted[idx] ?? "");
    setDigits(next);
    emit(next);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div
      className="grid w-full max-w-sm gap-1.5 sm:max-w-none sm:gap-2"
      style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
      role="group"
      aria-label={ariaLabel}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={digit}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="aspect-square w-full max-h-14 min-w-0 text-center font-display text-xl text-ink bg-panel border border-hairline outline-none transition-colors focus:border-2 focus:border-accent sm:text-2xl"
        />
      ))}
    </div>
  );
}
