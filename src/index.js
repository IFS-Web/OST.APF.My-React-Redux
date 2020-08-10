import { useState, useEffect, render, createElement } from "./my-react";

function Counter() {
  const [value1, setValue1] = useState(0);

  useEffect(() => {
    console.log("Counter changed to", value1);
    if (value1 == 5) {
      setValue1(0);
    }
  }, [value1]);

  return (
    <div>
      <p>You clicked {value1} times!</p>
      <button onClick={() => setValue1(value1 + 1)}>Click me</button>
    </div>
  );
}

function App() {
  useEffect(() => {
    console.log("App rendered once");
  }, []);

  useEffect(() => {
    console.log("App rendered");
  });

  return (
    <div>
      <Counter />
    </div>
  );
}

const container = document.getElementById("root");
render(<App />, container);
