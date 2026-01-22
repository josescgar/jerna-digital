import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button component variants using class-variance-authority.
 * Provides consistent button styling across the application.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-lg font-medium',
    'transition-all duration-normal ease-default',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-primary focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-primary text-primary-foreground',
          'hover:shadow-glow hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        secondary: [
          'bg-background-subtle text-foreground',
          'border border-border',
          'hover:bg-background-muted hover:border-border-subtle',
          'active:scale-[0.98]',
        ],
        outline: [
          'border border-primary text-primary',
          'bg-transparent',
          'hover:bg-primary/10',
          'active:scale-[0.98]',
        ],
        ghost: [
          'text-foreground-muted',
          'hover:text-foreground hover:bg-background-subtle',
          'active:scale-[0.98]',
        ],
        link: [
          'text-primary underline-offset-4',
          'hover:underline',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the component renders its child as the button,
   * useful for composing with links or other components.
   */
  asChild?: boolean;
}

/**
 * Button component with multiple variants and sizes.
 *
 * @example
 * <Button variant="primary" size="lg">Get Started</Button>
 * <Button variant="outline">Learn More</Button>
 * <Button asChild><a href="/contact">Contact</a></Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, asChild = false, ...props },
    ref
  ): React.ReactElement {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export { buttonVariants };
