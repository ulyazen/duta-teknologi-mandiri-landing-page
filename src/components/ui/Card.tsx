import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  as?: "div" | "article" | "section";
}

export function Card({ children, className, bordered = false, as = "div" }: CardProps) {
  const Tag = as;
  return (
    <Tag className={cn(bordered ? "card-bordered" : "card-primary", "p-6 md:p-8", className)}>
      {children}
    </Tag>
  );
}
