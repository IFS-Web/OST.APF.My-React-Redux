import { Action } from "./Action";
export type Reducer<State> = (state: State, action: Action) => State;
