import "./CSS/ToDoItems.css";
import tick from "./assets/tick.png";
import not_tick from "./assets/not_tick.png";
import cross from "./assets/cross.png";
const ToDoItems = ({ no, display, text, setTodo, setCount }) => {
  const delete_todo = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    data = data.filter((todo) => todo.no !== no);
    for (let i = no; i < data.length; i++) {
      data[i].no--;
    }
    let num = localStorage.getItem("todo_count")
    num -= 1;
    setTodo(data);
    localStorage.setItem("todo_count", num)

  };
  const toggle = (no) => {
    const data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        } else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodo(data);
  };
  return (
    <div className="todoitems">
      <div
        className={`todoitems-container ${display}`}
        onClick={() => {
          toggle(no);
        }}
      >
        {display === "" ?
          <img className="todoitems-not-tick" src={not_tick} alt="" />
          :
          <img className="todoitems-tick" src={tick} alt="" />
        }

        <div className="todoitems-text">{text}</div>
      </div>
      <img
        onClick={() => {

          delete_todo(no);
        }}
        className="todoitems-cross"
        src={cross}
        alt=""
      />
    </div>
  );
};

export default ToDoItems;
