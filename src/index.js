import { createElement, render, useState } from "./my-react";

function Counter() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  return (
    <div style={{ border: "1px solid grey" }}>
      <p>You clicked {counter1} times!</p>
      <button onClick={() => setCounter1(counter1 + 1)}>Click me</button>
      <p>You clicked {counter2} times!</p>
      <button onClick={() => setCounter2(counter2 + 1)}>Click me</button>
    </div>
  );
}

const container = document.getElementById("root");
render(<Counter />, container);
