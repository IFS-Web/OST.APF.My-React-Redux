import { Props } from "./Props";
import { Component } from "./Component";

export class FunctionalComponent implements Component {
  private type: (props: Props) => Component;
  private props: Props;

  // Keep a copy of the last rendered child
  private child: Component;

  constructor(type: (props: Props) => Component, props: Props) {
    this.type = type;
    this.props = props;
  }

  render(previousInstance: FunctionalComponent, parentDomNode: HTMLElement) {
    const currentInstance = this.type(this.props);

    currentInstance.render(previousInstance?.child, parentDomNode);

    this.child = currentInstance;
  }
}
