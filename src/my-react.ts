import { Component } from "./Component";
import { FunctionalComponent } from "./FunctionalComponent";
export { createElement } from "./createElement";

let rootComponent: Component = undefined;
let rootDomNode: HTMLElement = undefined;

export function render(component: Component, parentDomNode: HTMLElement) {
  component.render(rootComponent, parentDomNode);

  rootComponent = component;
  rootDomNode = parentDomNode;
}

export function useState<T>(initialValue: T) {
  return FunctionalComponent.current.useState(initialValue, () =>
    render(rootComponent, rootDomNode)
  );
}
