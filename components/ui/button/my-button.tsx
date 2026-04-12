"use client";

import React from "react";

interface ButtonProps {
  /** Texto ou conteúdo do botão (pode ser string, ícone, etc.) */
  children: React.ReactNode;
  onClick?: () => void;
  /** Estado desabilitado */
  disabled?: boolean;
  /** Estado de loading */
  loading?: boolean;
  /** Tamanho do botão */
  size?: "sm" | "md" | "lg";
  /** Classe extra para customizações (ex: largura total, margens, etc.) */
  className?: string;
  /** Tipo do botão HTML */
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
}

const MyButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = "md",
  className = "",
  type = "button",
  variant = "primary",
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium text-white transition-all duration-200 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 rounded-full shadow-md";

  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-green-500 to-green-400 hover:brightness-110",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-500 hover:brightness-110",
  };

  // Estados disabled + loading
  const stateClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${stateClasses} ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {/* Spinner de loading */}
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        <span>{children}</span>
      </div>
    </button>
  );
};

export default MyButton;
