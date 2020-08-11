export interface Component {
  render(previous: Component, parentDomNode: HTMLElement): void;
}
