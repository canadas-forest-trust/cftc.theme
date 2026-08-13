import { useId } from "react";
import { cn } from "../../lib/cn";
import { Eyebrow } from "./eyebrow";

export interface FileUploadProps {
  label: string;
  onFileChange: (files: FileList | null) => void;
  /** Controlled filename shown after selection / upload. */
  fileName?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  /** Override the dropzone prompt. */
  prompt?: string;
  className?: string;
  id?: string;
}

/**
 * FileUpload — bordered dropzone + hidden file input. Presentation only;
 * consumers handle upload I/O via `onFileChange`.
 */
export function FileUpload({
  label,
  onFileChange,
  fileName,
  accept,
  multiple,
  disabled,
  hint,
  error,
  prompt = "Drag a file or click to upload",
  className,
  id,
}: FileUploadProps) {
  const generated = useId();
  const inputId = id ?? generated;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Eyebrow as="label" htmlFor={inputId}>
        {label}
      </Eyebrow>
      <label
        htmlFor={inputId}
        className={cn(
          "flex min-h-28 cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-field bg-panel px-4 py-6 text-center transition-colors",
          disabled
            ? "cursor-not-allowed opacity-40"
            : "hover:border-accent focus-within:border-accent",
          error ? "border-danger" : "",
        )}
      >
        <span className="font-body text-sm text-ink">{fileName ?? prompt}</span>
        {hint && !fileName && (
          <span className="font-body text-xs text-muted">{hint}</span>
        )}
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => {
            onFileChange(e.target.files);
            // Allow re-selecting the same file after a failed upload.
            e.target.value = "";
          }}
        />
      </label>
      {error && (
        <span className="font-eyebrow text-xs uppercase tracking-wide text-danger">{error}</span>
      )}
    </div>
  );
}
