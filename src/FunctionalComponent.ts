import { Props } from "./Props";
import { Component } from "./Component";

export class FunctionalComponent implements Component {
  private type: (props: Props) => Component;
  private props: Props;

  constructor(type: (props: Props) => Component, props: Props) {
    this.type = type;
    this.props = props;
  }

  render(parentDomNode: HTMLElement) {
    const currentInstance = this.type(this.props);

    currentInstance.render(parentDomNode);
  }
}
