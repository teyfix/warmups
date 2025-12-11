import type { PropsWithChildren } from "react";
import { ReduxProvider } from "./providers/redux.provider";

export function Providers(props: PropsWithChildren) {
  return <ReduxProvider>{props.children}</ReduxProvider>;
}
