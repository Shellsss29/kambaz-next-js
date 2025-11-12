"use client";

import React from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  title: string;
}

interface TodosState {
  todos: Todo[];
}

export default function TodoList() {
  const { todos } = useSelector(
    (state: { todosReducer: TodosState }) => state.todosReducer
  );

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
