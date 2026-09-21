import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { UtilityBar } from "./UtilityBar";

/** Standard chrome for every page other than the homepage. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main>
        {children}
        <Footer />
      </main>
    </>
  );
}
