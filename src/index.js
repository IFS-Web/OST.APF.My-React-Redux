import { useEffect, render, createElement } from "./my-react";
import { createStore } from "./my-redux";
import { Provider } from "./my-react-redux";
import { reducer } from "./reducer";
import { resetCount, incrementCount } from "./actionCreators";

const store = createStore(reducer, {});

function CounterView() {
  const { count } = store.getState();

  useEffect(() => {
    if (count == 5) {
      store.dispatch(resetCount(0));
    }
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times!</p>
    </div>
  );
}

function CounterButton() {
  return (
    <div>
      <button onClick={() => store.dispatch(incrementCount())}>
        Increment
      </button>
      <button onClick={() => store.dispatch(resetCount(0))}>Reset</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div>
        <CounterView />
        <CounterButton />
      </div>
    </Provider>
  );
}

const container = document.getElementById("root");
render(<App />, container);
