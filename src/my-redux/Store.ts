import { Action } from "./Action";
import { Subscriber } from "./Subscriber";
import { Reducer } from "./Reducer";

export class Store<State> {
  private state: State;
  private reducer: Reducer<State>;
  private subscribers: Subscriber[];

  constructor(reducer: Reducer<State>) {
    this.reducer = reducer;
    this.subscribers = [];
    this.dispatch({ type: "@@redux/INIT" });
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    this.subscribers.forEach((subscriber) => subscriber());
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  getState() {
    return this.state;
  }
}
