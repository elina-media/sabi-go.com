"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

export default function ScrollLink({
  href,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();
  const id = href?.slice(1);

  if (!id) {
    return (
      <a
        href="#"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          onClick?.(event);
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  // Section lives on the home page — from any other page, navigate there
  // instead of silently failing to find the id on the current page.
  if (pathname !== "/") {
    return <Link href={`/#${id}`} onClick={onClick} {...props} />;
  }

  return (
    <a
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }}
      {...props}
    />
  );
}
