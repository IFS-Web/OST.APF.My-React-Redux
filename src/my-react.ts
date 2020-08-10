import { Component } from "./Component";
export { createElement } from "./createElement";

export function render(component: Component, parentDomNode: HTMLElement) {
  component.render(parentDomNode);
}
