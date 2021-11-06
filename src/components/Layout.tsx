import type * as React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      // 5rem = Navbar height
      style={{ minHeight: "calc(100vh - 5rem)" }}
      className="flex justify-center w-full px-5 pt-5"
    >
      <main className="w-full max-w-4xl">{children}</main>
    </div>
  );
};
