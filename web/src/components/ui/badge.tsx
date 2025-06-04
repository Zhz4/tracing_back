import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent bg-chart-2 text-white [a&]:hover:bg-chart-2/90 focus-visible:ring-chart-2/20 dark:focus-visible:ring-chart-2/40",
        warning:
          "border-transparent bg-chart-4 text-foreground [a&]:hover:bg-chart-4/90 focus-visible:ring-chart-4/20 dark:focus-visible:ring-chart-4/40",
        info: "border-transparent bg-chart-1 text-white [a&]:hover:bg-chart-1/90 focus-visible:ring-chart-1/20 dark:focus-visible:ring-chart-1/40",
        accent:
          "border-transparent bg-accent text-accent-foreground [a&]:hover:bg-accent/90",
        muted:
          "border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/90",
        purple:
          "border-transparent bg-chart-3 text-white [a&]:hover:bg-chart-3/90 focus-visible:ring-chart-3/20 dark:focus-visible:ring-chart-3/40",
        orange:
          "border-transparent bg-chart-5 text-white [a&]:hover:bg-chart-5/90 focus-visible:ring-chart-5/20 dark:focus-visible:ring-chart-5/40",
        "outline-success":
          "border-chart-2 text-chart-2 [a&]:hover:bg-chart-2/10 [a&]:hover:text-chart-2",
        "outline-warning":
          "border-chart-4 text-chart-4 [a&]:hover:bg-chart-4/10 [a&]:hover:text-chart-4",
        "outline-info":
          "border-chart-1 text-chart-1 [a&]:hover:bg-chart-1/10 [a&]:hover:text-chart-1",
        "outline-purple":
          "border-chart-3 text-chart-3 [a&]:hover:bg-chart-3/10 [a&]:hover:text-chart-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
