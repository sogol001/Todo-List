import React from "react";
import Todo from "./Todo";
 import "./TodoList.css";

class TodoList extends React.Component {
  render() {
    const {filteredTodos,setTodos,todos}=this.props;
    return (
      <div className="todo-container">
        {filteredTodos.map((todo) => {
          return (
            <Todo
            token={this.props.token }
            todos={todos}
            setTodos={setTodos}
            todo={todo}
              key={todo._id} 
            />
          );
        })}
      </div>
    );
  }
}
export default TodoList;











