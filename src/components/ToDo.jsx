import { useState } from "react";
import "./CSS/ToDo.css";
import { useRef } from "react";
import { useEffect } from "react";
import ToDoItems from "./ToDoItems";

const ToDo = () => {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState([]);
  const inputRef = useRef(null);
  const add = () => {
    setTodo([
      ...todo,
      { no: count, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todo_count", count)
    setCount(count + 1)
  };
  //use effect for storing local data into memory to keep data even when page is refreshed
  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem("todos")));


  }, []);
  //   to print in console only when todo is updated
  useEffect(() => {
    setTimeout(() => {
      console.log(todo);
      localStorage.setItem("todos", JSON.stringify(todo)), [todo];
    }, 100);
  });
  return (
    <div>
      <div className="todo">
        <div className="todo-header">TO-DO LIST</div>
        <div className="todo-add">
          <input
            type="text"
            placeholder="Enter Your Task:"
            className="todo-input"
            ref={inputRef}
          />
          <div
            className="todo-add-btn"
            onClick={() => {
              add();
            }}
          >
            ADD
          </div>
        </div>
        <div className="todo-list">
          {todo.map((item, index) => {
            return (
              <ToDoItems
                key={index}
                no={index}
                display={item.display}
                text={item.text}
                setTodo={setTodo}
                setCount={setCount}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
