import { Props } from "./Props";
import { Component } from "./Component";

type StatePair = {
  value: any;
  setState: (newValue: any) => void;
};

type EffectState = {
  effect: () => void;
  dependencies: any[];
  hasRun: boolean;
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

    // Restore effects from previous render, copy the array because
    // we still need the original later on.
    this.effects = [...(previousInstance?.effects || [])];
    this.effectIndex = 0;

    const currentInstance = this.type(this.props);

    currentInstance.render(previousInstance?.child, parentDomNode);

    this.runEffects(previousInstance?.effects || []);

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

  // for the useEffect hook

  private effects: EffectState[] = [];
  private effectIndex: number = 0;

  useEffect(effect: () => void, dependencies: any[]) {
    if (this.effectIndex === this.effects.length) {
      this.effects.push({
        effect,
        dependencies,
        hasRun: false,
      });
    } else {
      this.effects[this.effectIndex] = {
        effect,
        dependencies,
        hasRun: true,
      };
    }
    this.effectIndex += 1;
  }

  private runEffects(previousEffects: EffectState[]) {
    this.effects.forEach((effectState, index) => {
      const previousEffectState = (previousEffects
        ? previousEffects[index]
        : undefined) || {
        dependencies: [],
        hasRun: false,
      };

      // No dependencies, so just run it every time.
      if (!effectState.dependencies) {
        effectState.effect();
        effectState.hasRun = true;
        return;
      }
      // An empty array means 'run once'
      if (
        effectState.dependencies.length === 0 &&
        previousEffectState.hasRun === false
      ) {
        effectState.effect();
        effectState.hasRun = true;
        return;
      }
      for (let i = 0; i < effectState.dependencies.length; i++) {
        if (
          effectState.dependencies[i] !== previousEffectState.dependencies[i]
        ) {
          effectState.effect();
          effectState.hasRun = true;
          break;
        }
      }
    });
  }
}
