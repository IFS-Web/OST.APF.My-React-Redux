import { createElement, render } from "./my-react";

const App = (
  <div>
    <h1>My React</h1>
    <p>Let's re-create React from scratch!</p>
  </div>
);

const container = document.getElementById("root");
render(App, container);
