import { Component } from "./Component";
import { Props } from "./Props";
import { HtmlComponent } from "./HtmlComponent";
import { TextComponent } from "./TextComponent";

export function createElement(
  tag: string,
  props: Props = {},
  ...children: Component[]
): Component {
  const allProps = {
    ...props,
    children: children?.map((child) =>
      typeof child === "object" ? child : new TextComponent(child)
    ),
  };

  return new HtmlComponent(tag, allProps);
}
