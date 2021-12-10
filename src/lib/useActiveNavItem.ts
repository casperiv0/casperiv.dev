import { useRouter } from "next/router";
import * as React from "react";

interface Options {
  wrapperRef: React.RefObject<HTMLUListElement>;
  isDisabled?: boolean;
}

export function useActiveNavItem({ wrapperRef, isDisabled }: Options) {
  const router = useRouter();
  const [wrapperRect, setWrapperRect] = React.useState<DOMRect | null>(null);
  const [activeRect, setActiveRect] = React.useState<DOMRect | null>(null);
  const [hover, setHover] = React.useState(false);

  const styles =
    activeRect && wrapperRect
      ? {
          width: activeRect.width,
          height: 33.333,
          transform: `translateY(-50%) translateX(${activeRect.left - wrapperRect.left}px)`,
          transition: hover ? "all 150ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        }
      : {};

  function handleMouseOver(e: Pick<React.MouseEvent<HTMLLIElement>, "target">) {
    if (isDisabled) return;

    const target = e.target as HTMLLinkElement;

    if (!wrapperRef.current) {
      console.error("Could not fund the wrapperRef.");
      return;
    }

    setWrapperRect(wrapperRef.current.getBoundingClientRect() ?? null);
    setActiveRect(target.getBoundingClientRect());
  }

  function handleMouseLeave() {
    if (isDisabled) return;

    // timeout = wait for transition to finish
    findActiveElement();
    setTimeout(() => setHover(false), 150);
  }

  function findActiveElement() {
    if (isDisabled) return;

    const children = (wrapperRef.current?.children ?? []) as HTMLLIElement[];

    if (children.length > 0) {
      const pathname = ["/blog/[slug]", "/snippets/[slug]"].includes(router.pathname)
        ? router.pathname.replace("/[slug]", "")
        : router.pathname;
      const hash = pathname === "/" ? window.location.hash : "";
      const href = `${pathname}${hash}`;

      const child = [...children].find((v) => v.dataset.href === href) ?? [...children][0];

      if (child) {
        handleMouseOver({ target: child });
      }
    }
  }

  return {
    handleMouseOver,
    handleMouseLeave,
    findActiveElement,
    setHover,
    hasActiveItem: activeRect !== null,
    styles,
  };
}
