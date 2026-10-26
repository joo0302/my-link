import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-tds-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-toss-blue-50 dark:bg-toss-dark-blueWeak text-toss-blue-500 dark:text-toss-dark-blue border-transparent",
        secondary:
          "bg-toss-grey-100 dark:bg-toss-dark-surface text-toss-grey-600 dark:text-toss-dark-subtext border-transparent",
        outline:
          "border border-toss-blue-500/20 text-toss-blue-500 dark:text-toss-dark-blue bg-toss-blue-50/50 dark:bg-toss-dark-blueWeak/50",
        solid:
          "bg-toss-blue-500 text-white border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
