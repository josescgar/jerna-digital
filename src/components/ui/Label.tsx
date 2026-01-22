import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /**
   * When true, displays required indicator (*).
   */
  required?: boolean;
}

/**
 * Label component for form inputs.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 * <Label htmlFor="name" required>Name</Label>
 */
export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(function Label(
  { className, required, children, ...props },
  ref
): React.ReactElement {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none text-foreground',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-primary">*</span>}
    </LabelPrimitive.Root>
  );
});
