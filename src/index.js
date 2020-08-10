import { createElement, render } from "./my-react";

function HelloMessage(props) {
  return <p>Hello {props.name}</p>;
}

function HelloWorld() {
  return <HelloMessage name="OST"></HelloMessage>;
}

function Wrapper() {
  return <HelloWorld />;
}

function App() {
  return <Wrapper />;
}

const container = document.getElementById("root");
render(<App />, container);
