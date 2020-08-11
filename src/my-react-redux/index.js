import { createElement, useEffect, rerender } from "../my-react";

export function Provider({ store, children }) {
  useEffect(() => {
    store.subscribe(() => rerender());
  }, []);
  return <div>{children}</div>;
}
