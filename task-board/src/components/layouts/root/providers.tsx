import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "./providers/redux.provider";

export function Providers(props: PropsWithChildren) {
  return (
    <ReduxProvider>
      {props.children}
      <Toaster />
    </ReduxProvider>
  );
}
