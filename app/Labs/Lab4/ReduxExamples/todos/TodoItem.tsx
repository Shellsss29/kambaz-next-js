"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { Button, ListGroupItem } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
}

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const dispatch = useDispatch();

    return (
        <ListGroupItem>
            <Button
                id="wd-delete-todo-click"
                onClick={() => dispatch(deleteTodo(todo.id))}
            >
                Delete
            </Button>

            <Button
                id="wd-set-todo-click"
                onClick={() => dispatch(setTodo(todo))}
            >
                Edit
            </Button>

            {todo.title}
        </ListGroupItem>
    );
}
