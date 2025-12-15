interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  hint?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  hint,
  error,
  className = "",
  ...props
}) => (
  <div className="form-group">
    <label
      htmlFor={id}
      className="form-label"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      className={`form-input ${className}`}
      {...props}
    />
    {hint && !error && (
      <div className="form-hint">
        {hint}
      </div>
    )}
    {error && (
      <div
        className="text-xs mt-1.5"
        style={{ color: "#E84545" }}
      >
        {error}
      </div>
    )}
  </div>
);
  