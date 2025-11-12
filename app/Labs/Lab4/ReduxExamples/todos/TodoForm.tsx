"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import type { RootState, AppDispatch } from "../../store/index";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ListGroupItem>
      <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
        Add
      </Button>

      <Button
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        Update
      </Button>

      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </ListGroupItem>
  );
}
