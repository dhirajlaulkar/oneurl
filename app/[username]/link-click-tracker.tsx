"use client";

import { cloneElement, isValidElement } from "react";

export default function LinkClickTracker({
  children,
  linkId,
  profileId,
}: {
  children: React.ReactNode;
  linkId: string;
  profileId: string;
}) {
  const handleClick = () => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        linkId,
        profileId,
      }),
    }).catch(() => {});
  };

  if (isValidElement(children)) {
    return cloneElement(children as any, {
      onClick: (e: React.MouseEvent) => {
        handleClick();
        if ((children as any).props.onClick) {
          (children as any).props.onClick(e);
        }
      },
    });
  }

  return <>{children}</>;
}

