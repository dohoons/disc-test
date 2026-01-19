/**
 * Spinner Component
 * Loading indicator with different sizes
 */

import { HTMLAttributes } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: 'default' | 'D' | 'I' | 'S' | 'C';
  label?: string;
}

const sizeStyles: Record<SpinnerSize, { width: string; height: string; borderWidth: string }> = {
  sm: { width: 'w-4', height: 'h-4', borderWidth: 'border-2' },
  md: { width: 'w-8', height: 'h-8', borderWidth: 'border-3' },
  lg: { width: 'w-12', height: 'h-12', borderWidth: 'border-4' },
  xl: { width: 'w-16', height: 'h-16', borderWidth: 'border-4' },
};

const variantColors: Record<'default' | 'D' | 'I' | 'S' | 'C', string> = {
  default: 'border-blue-600 border-t-transparent',
  D: 'border-disc-d border-t-transparent',
  I: 'border-disc-i border-t-transparent',
  S: 'border-disc-s border-t-transparent',
  C: 'border-disc-c border-t-transparent',
};

export function Spinner({
  size = 'md',
  variant = 'default',
  label,
  className = '',
  ...props
}: SpinnerProps) {
  const { width, height, borderWidth } = sizeStyles[size];
  const colorClass = variantColors[variant];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} {...props}>
      <div
        className={`${width} ${height} ${borderWidth} ${colorClass} rounded-full animate-spin`}
        role="status"
      />
      {label && (
        <p className="mt-3 text-sm text-gray-600 animate-pulse">{label}</p>
      )}
    </div>
  );
}

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = '로딩 중...' }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}
