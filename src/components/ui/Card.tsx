import * as React from 'react';
import { cn } from '@/features/common/common.utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, applies glass morphism effect to the card.
   */
  glass?: boolean;
  /**
   * When true, adds hover effects for interactive cards.
   */
  interactive?: boolean;
}

/**
 * Card container component with optional glass effect and hover states.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, glass = false, interactive = false, ...props },
  ref
): React.ReactElement {
  return (
    <div
      ref={ref}
      className={cn(
        'border-border rounded-xl border',
        glass ? 'glass' : 'bg-background-elevated',
        interactive && [
          'duration-normal ease-default transition-all',
          'hover:border-border-subtle hover:shadow-lg',
          'hover:-translate-y-1',
        ],
        className
      )}
      {...props}
    />
  );
});

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card header section for title and description.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref): React.ReactElement {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2 p-6', className)}
        {...props}
      />
    );
  }
);

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Card title component.
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle(
    { className, children, ...props },
    ref
  ): React.ReactElement {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-xl leading-tight font-semibold tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * Card description component.
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(function CardDescription({ className, ...props }, ref): React.ReactElement {
  return (
    <p
      ref={ref}
      className={cn('text-foreground-muted text-sm', className)}
      {...props}
    />
  );
});

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card content section.
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...props }, ref): React.ReactElement {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
  }
);

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card footer section, typically for actions.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref): React.ReactElement {
    return (
      <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
      />
    );
  }
);
