"use client";

import { store } from "@/reduxStore/stores/store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}