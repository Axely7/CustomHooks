import { useEffect, useReducer } from "react";
import { todoReducer } from "../todoReducer";

const initialState = [];

const init = () => {
  let lc = null;
  if (typeof window !== "undefined") {
    lc = localStorage.getItem("todos");
  }
  return JSON.parse(lc) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) || []);
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = { type: "[TODO] Add Todo", payload: todo };
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "[TODO] Remove Todo", payload: id });
  };

  const handleToggleTodo = (id) => {
    console.log(id);
    dispatch({ type: "[TODO] Toggle Todo", payload: id });
  };

  const todosCount = todos.length;
  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  return {
    todosCount,
    pendingTodosCount,
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
