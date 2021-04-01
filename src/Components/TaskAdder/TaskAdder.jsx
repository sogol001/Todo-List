
import axios from "axios";
import React from "react";
import "./TaskAdder.css";


class TaskAdder extends React.Component {
  onFilterChange=(e)=>{
    console.log(e.target.value)
    this.props.onFilterChange(e.target.value)
  }
  
  state = { taskInput: "" };
  onInputChange = (e) => {
    this.setState({ taskInput: e.target.value });
  };
  onFormSubmit =async (e)  => {
    e.preventDefault();
    if(this.state.taskInput===''){
      return alert("Nothing has been submitted")
    }

    try{
     const addingTodoData= await axios.post(
      'http://localhost:8000/api/v1/todos/',
       {
          name:'todo',
          description:this.state.taskInput,
          isChecked:false,
       },
       {
        headers: {
            Authorization: `Bearer ${this.props.token}`,
        },
    }
     );
  
    this.props.onSubmit([...this.props.todos,
      {
        description: this.state.taskInput,
        isChecked:false,
        _id:addingTodoData.data.data._id,
    }]);
    this.setState({ taskInput: "" });
  }catch(error){
    console.log(error.response);
  }
  };
  render() {
    return (
      <div className="taskadder-container wrapper">
        <h1>
        <img className="im" src="https://image.flaticon.com/icons/png/512/458/458842.png"></img>
          <span className="todo-styling rainbow-text">TODO List</span>
        </h1>
        <form className="input-container" onSubmit={this.onFormSubmit}>
          <input
            className="add-task-input"
            type="text"
            placeholder="whats to do?"
            value={this.state.taskInput}
            onChange={this.onInputChange}
          />

          <button type="submit" className="submit">
            +
          </button>
          <select 
          value={this.props.selectedFilter}
          onChange={this.onFilterChange}
          name="filter" id="filter" className="filter">
            <option value="all">All</option>
            <option value="finished">Finished</option>
            <option value="unfinished">Unfinished</option>
          </select>
        </form>
      </div>
    );
  }
}
export default TaskAdder;
 