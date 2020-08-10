import { Component } from "./Component";
import { Props } from "./Props";

export class TextComponent implements Component {
  private nodeValue: string;

  constructor(nodeValue: string) {
    this.nodeValue = nodeValue;
  }

  render(parentDomNode: HTMLElement) {}
}
