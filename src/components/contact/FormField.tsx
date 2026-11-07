import type { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  helperText?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
};

export function FormField({
  id,
  label,
  required = false,
  error,
  helperText,
  children,
  className = '',
}: FormFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-small font-semibold text-foreground">
        {label} {required && <span className="text-primary">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>

      {/* Input container */}
      <div data-described-by={describedBy} className="relative">
        {children}
      </div>

      {helperText && !error && (
        <p id={helperId} className="text-caption text-muted-foreground">
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-caption font-medium text-destructive"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
