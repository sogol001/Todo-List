import React from "react";
import axios from 'axios';
import './Todo.css';

class Todo extends React.Component {

  deletHandler=async()=>{
    try{
      const deleteTodoData =await axios.delete(`http://localhost:8000/api/v1/todos/${this.props.todo._id}`,{
        headers:{
          Authorization: `Bearer ${this.props.token}`,
        },
      })
    this.props.setTodos(
      this.props.todos.filter(
        (el)=>el._id!==this.props.todo._id));
      }catch(error){
        return alert(error.response)
      }
  }

completeHandler=async()=>{

  try{
    const chechItemData=await axios.patch(`http://localhost:8000/api/v1/todos/${this.props.todo._id}`,
    {isChecked:!this.props.todo.isChecked},
    {
      headers:{
        Authorization: `Bearer ${this.props.token}`,
      },
    })
  }catch(error){
    console.log(error.response);
  }

  this.props.setTodos(
    this.props.todos.map((item)=>{
      if(item._id===this.props.todo._id){
        return{ 
          ...item,
          isChecked: !item.isChecked,
      }
      }
      return item;
    })
  ) 
}

  render() { 
    return (
      <div className="todo-block">
        <li>{this.props.todo.description}</li>
        <div
        onClick={this.completeHandler}
        >
        <img className="complete-btn" src="https://cdn3.iconfinder.com/data/icons/user-interface-user-experience-4/24/157-512.png"></img>
        </div>
        <div
        onClick={this.deletHandler}
        >
        <img className="trash-btn" src="https://freeiconshop.com/wp-content/uploads/edd/trash-var-flat.png"></img>
        </div>
        {/* {this.props.checked} */}
      </div>
    );
  }
}
export default Todo;
