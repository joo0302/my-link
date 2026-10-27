import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-tds-m border border-toss-grey-200 dark:border-toss-dark-border",
          "bg-white dark:bg-toss-dark-surface",
          "px-4 py-2.5 text-[15px] text-toss-grey-900 dark:text-white",
          "placeholder:text-toss-grey-400 dark:placeholder:text-toss-dark-muted",
          "focus:outline-none focus:ring-2 focus:ring-toss-blue-500 focus:border-toss-blue-500",
          "transition-colors duration-150",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
