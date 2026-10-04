import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";

const controlClasses =
  "w-full min-h-[43px] rounded-[5px] border border-[#dbe4d5] bg-white p-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-700 aria-invalid:border-[#e9c6ba]";

interface FieldProps {
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Stacked label + control + error. Wrap any control, or use the TextField/SelectField/TextAreaField shortcuts. */
export const Field = ({ label, error, hint, className, children }: FieldProps) => (
  <label className={cn("my-4 flex flex-col gap-[7px] text-sm text-[#47654d]", className)}>
    {label}
    {children}
    {hint && !error && <span className="text-xs text-muted">{hint}</span>}
    {error && <span className="text-xs text-[#9e4b41]">{error}</span>}
  </label>
);

type BaseFieldProps = Omit<FieldProps, "children">;

export const TextField = ({
  label,
  error,
  hint,
  className,
  ...inputProps
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) => (
  <Field label={label} error={error} hint={hint} className={className}>
    <input aria-invalid={!!error || undefined} className={controlClasses} {...inputProps} />
  </Field>
);

interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<string | { label: string; value: string }>;
  placeholder?: string;
}

export const SelectField = ({
  label,
  error,
  hint,
  className,
  options,
  placeholder,
  ...selectProps
}: SelectFieldProps) => (
  <Field label={label} error={error} hint={hint} className={className}>
    <select aria-invalid={!!error || undefined} className={controlClasses} {...selectProps}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => {
        const { label: text, value } = typeof option === "string" ? { label: option, value: option } : option;
        return (
          <option key={value} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  </Field>
);

export const TextAreaField = ({
  label,
  error,
  hint,
  className,
  ...textareaProps
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <Field label={label} error={error} hint={hint} className={className}>
    <textarea
      aria-invalid={!!error || undefined}
      className={cn(controlClasses, "min-h-[100px] resize-y")}
      {...textareaProps}
    />
  </Field>
);

export const CheckboxField = ({
  label,
  className,
  ...inputProps
}: { label: ReactNode } & InputHTMLAttributes<HTMLInputElement>) => (
  <label className={cn("my-2.5 flex items-center gap-2.5 text-sm", className)}>
    <input type="checkbox" {...inputProps} />
    {label}
  </label>
);
