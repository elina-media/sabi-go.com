"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

export default function ScrollLink({
  href,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    event.preventDefault();
    const id = href?.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return <a href={href} onClick={handleClick} {...props} />;
}
