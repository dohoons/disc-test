/**
 * Card Component
 * Reusable card container with different variants
 */

import { HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'D' | 'I' | 'S' | 'C';
type CardSize = 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  noPadding?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white rounded-xl shadow-md',
  D: 'bg-white rounded-xl shadow-md border-l-4 border-disc-d',
  I: 'bg-white rounded-xl shadow-md border-l-4 border-disc-i',
  S: 'bg-white rounded-xl shadow-md border-l-4 border-disc-s',
  C: 'bg-white rounded-xl shadow-md border-l-4 border-disc-c',
};

const sizeStyles: Record<CardSize, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      size = 'md',
      noPadding = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = variantStyles[variant];
    const paddingStyle = noPadding ? '' : sizeStyles[size];
    const combinedClassName = `${baseStyles} ${paddingStyle} ${className}`;

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function CardHeader({ title, description, className = '', children, ...props }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      {children}
    </div>
  );
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className = '', children, ...props }: CardBodyProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}
