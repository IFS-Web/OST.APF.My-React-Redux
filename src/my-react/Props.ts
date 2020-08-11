import { Component } from "./Component";

export type Props = {
  [key: string]:
    | string
    | Component
    | Component[]
    | EventListenerOrEventListenerObject;
  children?: Component[];
};
