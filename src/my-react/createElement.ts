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
    children: children
      ?.map((child) =>
        typeof child === "object" ? child : new TextComponent(child)
      )
      // In some circusmtances, children is an [[]], so we flatten it here:
      .reduce((acc, val) => acc.concat(val), []),
  };

  if (typeof tag === "function") {
    return new FunctionalComponent(tag, allProps);
  } else {
    return new HtmlComponent(tag, allProps);
  }
}
