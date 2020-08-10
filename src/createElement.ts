import { Component } from "./Component";
import { Props } from "./Props";
import { HtmlComponent } from "./HtmlComponent";
import { TextComponent } from "./TextComponent";
import { FunctionalComponent } from "./FunctionalComponent";

export function createElement(
  tag: string | ((props: Props) => Component),
  props: Props = {},
  ...children: Component[]
): Component {
  const allProps = {
    ...props,
    children: children?.map((child) =>
      typeof child === "object" ? child : new TextComponent(child)
    ),
  };

  if (typeof tag === "function") {
    return new FunctionalComponent(tag, allProps);
  } else {
    return new HtmlComponent(tag, allProps);
  }
}
