import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * When true, displays error styling.
   */
  error?: boolean;
}

/**
 * Textarea component with consistent styling and error states.
 *
 * @example
 * <Textarea placeholder="Your message" rows={4} />
 * <Textarea error={!!errors.message} {...register('message')} />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, error, ...props }, ref): React.ReactElement {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border bg-background-subtle px-4 py-3',
          'text-base text-foreground placeholder:text-foreground-subtle',
          'transition-colors duration-fast resize-none',
          'focus-visible:outline-none focus-visible:ring-2',
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
