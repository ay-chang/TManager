import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "../css/todo.css";

const api_base = "http://localhost:3000";

export default function Todo() {
   const [todos, setTodos] = useState([]);
   const [newTodo, setNewTodo] = useState("");

   useEffect(() => {
      GetTodos();
      // console.log(todos);
   }, []);

   const GetTodos = () => {
      fetch(api_base + "/todos")
         .then((res) => res.json())
         .then((data) => setTodos(data))
         .catch((err) => console.error("Error: ", err));
   };

   const addTodo = async (e) => {
      e.preventDefault();
      const data = await fetch(api_base + "/todo/new", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            text: newTodo,
         }),
      }).then((res) => res.json());

      setTodos([...todos, data]);
      setNewTodo("");
   };

   const deleteTodo = async (id) => {
      const data = await fetch(api_base + "/todo/delete/" + id, { method: "DELETE" })
         .then((res) => res.json())
         .catch((err) => console.error("Error: ", err));

      console.log("Item Deleted");
      setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
   };

   const completeTodo = async (id) => {
      const data = await fetch(api_base + "/todo/complete/" + id).then((res) => res.json());

      setTodos((todos) =>
         todos.map((todo) => {
            if (todo._id === data._id) {
               todo.complete = data.complete;
            }

            console.log("Item Completed");
            return todo;
         })
      );
   };
   return (
      <div className="Todo">
         <h3 className="title">Get Stuff Done</h3>

         <form className="submission-form" onSubmit={addTodo}>
            <input
               className="submission-input"
               name="task"
               type="text"
               onChange={(e) => setNewTodo(e.target.value)}
               value={newTodo}
               autoComplete="off"
               required
            />
            <label className="submission-label">
               <span className="task-label">Add Task</span>
            </label>
         </form>

         {/* <div className="todo-list">
            {todos.map((todo) => (
               <div className={"todo" + (todo.complete ? "is-complete" : "")} key={todo._id}>
                  <input className="checkbox" type="checkbox" onClick={() => completeTodo(todo._id)} />

                  <div className="todo-item">{todo.text}</div>
                  <div className="dropdown">
                     <FontAwesomeIcon className="dropbtn" icon={faEllipsis}></FontAwesomeIcon>
                     <div className="dropdown-content">
                        <li>Edit</li>
                        <li onClick={() => deleteTodo(todo._id)}>Delete</li>
                     </div>
                  </div>
               </div>
            ))}
         </div> */}

         <div className="todo-list">
            {todos.length > 0 ? (
               todos.map((todo) => (
                  <div className={"todo" + (todo.complete ? " is-complete" : "")} key={todo._id}>
                     <div className="checkbox" onClick={() => completeTodo(todo._id)}></div>
                     <div className="text">{todo.text}</div>
                     <div className="dropdown">
                        <FontAwesomeIcon className="dropbtn" icon={faEllipsis}></FontAwesomeIcon>
                        <div className="dropdown-content">
                           <li>Edit</li>
                           <li onClick={() => deleteTodo(todo._id)}>Delete</li>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <p>You currently have no tasks</p>
            )}
         </div>
      </div>
   );
}
