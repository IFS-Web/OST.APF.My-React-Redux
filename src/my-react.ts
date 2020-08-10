import { Component } from "./Component";
import { FunctionalComponent } from "./FunctionalComponent";
export { createElement } from "./createElement";

let rootComponent: Component = undefined;
let rootDomNode: HTMLElement = undefined;

let pendingRenderRequests = 0;

export function render(component: Component, parentDomNode: HTMLElement) {
  pendingRenderRequests += 1;

  // If we call render while we are already rendering, e.g., because an effect
  // called a state hook, we abort here but the do..while loop will do another
  // render cycle the previous one is done.
  if (pendingRenderRequests > 1) {
    return;
  }

  do {
    while (parentDomNode.firstChild) {
      parentDomNode.removeChild(parentDomNode.lastChild);
    }

    component.render(rootComponent, parentDomNode);

    rootComponent = component;
    rootDomNode = parentDomNode;

    pendingRenderRequests -= 1;
  } while (pendingRenderRequests > 0);
}

export function useState<T>(initialValue: T) {
  return FunctionalComponent.current.useState(initialValue, rerender);
}

export function useEffect(effect: () => void, dependencies: any[]) {
  return FunctionalComponent.current.useEffect(effect, dependencies);
}

export function rerender() {
  render(rootComponent, rootDomNode);
}
