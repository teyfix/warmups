"use client";

import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function ReduxProvider(props: PropsWithChildren) {
  return <Provider store={store}>{props.children}</Provider>;
}
