import { Component } from "./Component";
import { Props } from "./Props";

export class HtmlComponent implements Component {
  private type: string;
  private props: Props;

  constructor(type: string, props: Props) {
    this.type = type;
    this.props = props;
  }

  render(parentDomNode: HTMLElement) {}
}
