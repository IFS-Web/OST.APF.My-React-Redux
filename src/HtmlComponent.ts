import { Component } from "./Component";
import { Props } from "./Props";

export class HtmlComponent implements Component {
  private type: string;
  private props: Props;

  constructor(type: string, props: Props) {
    this.type = type;
    this.props = props;
  }

  render(previousInstance: HtmlComponent, parentDomNode: HTMLElement) {
    const dom = document.createElement(this.type);

    const isEvent = (name: string) => name.startsWith("on");
    const isAttribute = (name: string) =>
      !isEvent(name) && name !== "style" && name !== "children";

    Object.keys(this.props)
      .filter(isAttribute)
      .forEach((name) => (dom[name] = this.props[name]));

    Object.keys(this.props)
      .filter(isEvent)
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(
          eventType,
          this.props[name] as EventListenerOrEventListenerObject
        );
      });

    if (this.props.style) {
      Object.keys(this.props.style).forEach(
        (sKey) => (dom.style[sKey] = this.props.style[sKey])
      );
    }

    this.props.children.forEach((child, index) =>
      child.render(previousInstance?.props?.children[index], dom)
    );

    parentDomNode.appendChild(dom);
  }
}
