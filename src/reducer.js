export function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };

    case "RESET":
      return { ...state, count: action.to };

    default:
      return state;
  }
}
