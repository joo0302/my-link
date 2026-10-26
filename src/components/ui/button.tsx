import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.985]",
  {
    variants: {
      variant: {
        default:
          "bg-toss-blue-500 text-white font-bold hover:bg-toss-blue-600 active:bg-toss-blue-700 shadow-tds-1",
        secondary:
          "bg-toss-grey-100 dark:bg-toss-dark-surface hover:bg-toss-grey-200 dark:hover:bg-toss-dark-elevated text-toss-grey-900 dark:text-white font-semibold",
        ghost:
          "hover:bg-toss-grey-100 dark:hover:bg-toss-dark-surface text-toss-grey-700 dark:text-toss-dark-subtext",
        outline:
          "border border-toss-grey-200 dark:border-toss-dark-border bg-transparent hover:bg-toss-grey-100 dark:hover:bg-toss-dark-surface text-toss-grey-900 dark:text-white",
        brandWeak:
          "bg-toss-blue-50 dark:bg-toss-dark-blueWeak text-toss-blue-500 dark:text-toss-dark-blue font-semibold hover:bg-toss-blue-100",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-tds-m text-[14px]",
        sm: "h-8 px-3 rounded-tds-s text-[12px]",
        lg: "h-14 px-6 rounded-tds-xl text-[16px] font-bold",
        icon: "h-10 w-10 rounded-full p-0 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
