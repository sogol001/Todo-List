import React from "react";
import TaskAdder from "../Components/TaskAdder/TaskAdder";
import "../App.css";
import TodoList from "../Components/TodoList/TodoList";
import axios from 'axios';
import Cookies from 'universal-cookie'; 
class TodoListPage extends React.Component {
  state = { todos: [] , filteredTodos:[],selectedOption:'all'};
 cookies=new Cookies();
 token=this.cookies.get('token');
 
 componentDidMount = async () => {
  try {
      const userData = await axios.get(
          'http://localhost:8000/api/v1/users/me/',
          {
              headers: {
                  Authorization: `Bearer ${this.token}`,
              },
          }
      );
      console.log(userData.data.data.doc.username);
      this.props.setUsername(userData.data.data.doc.username);
      this.getTodos();
  } catch (error) {
      console.log(error.response);
  }
};

getTodos = async () => {
  const userTodos = await axios.get(
      'http://localhost:8000/api/v1/todos/',
      {
          headers: {
              Authorization: `Bearer ${this.token}`,
          }, 
      }
  );
      console.log(userTodos)
      this.setTodos(userTodos.data.todos)
};
   

componentDidUpdate(prevProps,prevState){
  if(prevState.todos!==this.state.todos || prevState.selectedOption !==this.state.selectedOption){
    this.filterOptionHandler();
  }
}
 filterOptionHandler=()=>{
  switch(this.state.selectedOption){
    case 'finished':
      this.setState({filteredTodos:this.state.todos.filter((item)=>(item.isChecked===true))})
      break;
    case 'unfinished':
      this.setState({filteredTodos:this.state.todos.filter((item)=>(item.isChecked===false))})
      break;
    default:
      this.setState({filteredTodos:this.state.todos})
      break;
  }
 };


 onFilterChange=(option)=>{
   this.setState({selectedOption:option});
 }
 
  setTodos = (item) => {
    this.setState({ todos: item });
  };
  render() {
    return (
      <div>
        <TaskAdder 
         token={this.token}
        selectedFilter={this.state.selectedOption}
        todos={this.state.todos}
        onFilterChange={this.onFilterChange} 
        onSubmit={this.setTodos} />

        <TodoList
         token={this.token}
        setTodos={this.setTodos}
         todos={this.state.todos}
        filteredTodos={this.state.filteredTodos}/>
      </div>
    );
  }
}
export default TodoListPage;
