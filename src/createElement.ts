export function createElement(tag: string, props: any, ...children: any[]) {
  return {
    tag,
    props: {
      ...props,
      children: children,
    },
  };
}
