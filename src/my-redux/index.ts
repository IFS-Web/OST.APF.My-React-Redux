import { Reducer } from "./Reducer";
import { Store } from "./Store";

export function createStore<State>(reducer: Reducer<State>) {
  return new Store<State>(reducer);
}
