import { Component } from "./Component";

export class TextComponent implements Component {
  private nodeValue: string;

  constructor(nodeValue: string) {
    this.nodeValue = nodeValue;
  }

  render(previousInstance: TextComponent, parentDomNode: HTMLElement) {
    const dom = document.createTextNode(this.nodeValue);

    parentDomNode.appendChild(dom);
  }
}
