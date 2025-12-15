import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  asLink?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  asLink = false,
  href,
  ...props
}) => {
  const variantClasses = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    outline: "btn-outline",
    success: "btn-success",
    danger: "btn-danger",
  };

  const sizeClasses = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  const classes = [
    "btn",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asLink && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
