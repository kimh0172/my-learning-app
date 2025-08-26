import React from "react";
type Variants = "primary" | "soft" | "outline" | "danger";
export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variants }
> = ({ className = "", variant = "soft", ...props }) => (
  <button
    {...props}
    className={`btn ${variant ? `btn--${variant}` : ""} ${className}`}
  />
);
