import React from "react";
export const Chip: React.FC<{
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`chip ${active ? "chip--active" : ""}`}>
    {children}
  </button>
);
