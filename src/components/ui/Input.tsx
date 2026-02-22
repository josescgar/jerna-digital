import * as React from 'react';
import { cn } from '@/features/common/common.utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * When true, displays error styling.
   */
  error?: boolean;
}

/**
 * Input component with consistent styling and error states.
 *
 * @example
 * <Input placeholder="Your email" type="email" />
 * <Input error={!!errors.email} {...register('email')} />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { className, type, error, ...props },
    ref
  ): React.ReactElement {
    return (
      <input
        type={type}
        className={cn(
          'bg-background-subtle flex h-11 w-full rounded-lg border px-4 py-2',
          'text-foreground placeholder:text-foreground-subtle text-base',
          'duration-fast transition-colors',
          'focus-visible:ring-2 focus-visible:outline-none',
          'focus-visible:ring-primary focus-visible:ring-offset-2',
          'focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-error focus-visible:ring-error'
            : 'border-border hover:border-border-subtle',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
