import { Component } from "./Component";
export { createElement } from "./createElement";

let rootComponent: Component = undefined;

export function render(component: Component, parentDomNode: HTMLElement) {
  component.render(rootComponent, parentDomNode);

  rootComponent = component;
}
