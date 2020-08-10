import { Props } from "./Props";
import { Component } from "./Component";

type StatePair = {
  value: any;
  setState: (newValue: any) => void;
};

export class FunctionalComponent implements Component {
  private type: (props: Props) => Component;
  private props: Props;

  // Keep a copy of the last rendered child
  private child: Component;

  constructor(type: (props: Props) => Component, props: Props) {
    this.type = type;
    this.props = props;
  }

  public static current: FunctionalComponent = null;

  render(previousInstance: FunctionalComponent, parentDomNode: HTMLElement) {
    FunctionalComponent.current = this;

    this.states = previousInstance?.states || [];
    this.stateIndex = 0;

    const currentInstance = this.type(this.props);

    currentInstance.render(previousInstance?.child, parentDomNode);

    this.child = currentInstance;
  }

  // for the useState hook

  private states: StatePair[];
  private stateIndex: number;

  useState<T>(initialValue: T, renderCallback: () => void) {
    if (this.stateIndex === this.states.length) {
      const statePair = {
        value: initialValue,
        setState(newValue: T) {
          statePair.value = newValue;
          renderCallback();
        },
      };
      this.states.push(statePair);
    }

    const { value, setState } = this.states[this.stateIndex];
    this.stateIndex += 1;
    return [value, setState];
  }
}
