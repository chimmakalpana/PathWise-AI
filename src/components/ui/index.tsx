import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    outline: 'border border-gray-600 hover:bg-gray-800 text-gray-100',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false, ...props }) => {
  return (
    <div className={clsx(
      'bg-gradient-to-br from-gray-900/50 to-gray-800/30',
      'border border-gray-700/50 rounded-lg backdrop-blur-md',
      'p-6 transition-all duration-300',
      hover && 'hover:from-gray-800/60 hover:to-gray-700/40 hover:border-gray-600/70 hover:shadow-lg',
      className
    )} {...props}>
      {children}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'w-full px-3 py-2 rounded-lg',
        'bg-gray-800 border border-gray-700',
        'text-gray-100 placeholder-gray-500',
        'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
        'transition-colors',
        className
      )}
      {...props}
    />
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <select
      className={clsx(
        'w-full px-3 py-2 rounded-lg',
        'bg-gray-800 border border-gray-700',
        'text-gray-100',
        'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
        'transition-colors appearance-none cursor-pointer',
        className
      )}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={clsx(
        'w-full px-3 py-2 rounded-lg',
        'bg-gray-800 border border-gray-700',
        'text-gray-100 placeholder-gray-500',
        'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
        'transition-colors resize-none',
        className
      )}
      {...props}
    />
  );
};

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'info', children, className }) => {
  const variantClasses = {
    success: 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50',
    warning: 'bg-amber-900/30 text-amber-300 border border-amber-700/50',
    error: 'bg-red-900/30 text-red-300 border border-red-700/50',
    info: 'bg-blue-900/30 text-blue-300 border border-blue-700/50',
  };

  return (
    <span className={clsx('inline-block px-3 py-1 rounded-full text-sm font-medium', variantClasses[variant], className)}>
      {children}
    </span>
  );
};

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, label, showLabel = true, className }) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className={clsx("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">{label || 'Progress'}</span>
          <span className="text-blue-400 font-medium">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
