import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant = "ghost" | "solid";

interface BaseProps {
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseProps {
  as?: "button";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

interface ButtonAsLink extends BaseProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const variant: Variant = "solid";
  const className = cn(variant === "solid" ? "btn-solid" : "btn-ghost", props.className);

  if (props.as === "a") {
    return (
      <a className={className} href={props.href} target={props.target} rel={props.rel}>
        {props.children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
