import React , {Component}from 'react';
import {Route , Switch} from 'react-router-dom';
import Nav from './Components/Nav';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import './App.css';
import TodoListPage from './pages/TodoListPage';

import Cookies from 'universal-cookie';

class App extends Component{
state={isAthenticated:false ,username:''};
cookie=new Cookies();
 authHandler=()=>{
     this.setState({isAthenticated:true});
 }
     logoutHandler=()=>{
         this.setState({isAthenticated:false});
         this.cookie.remove('token');
     }
     componentDidMount=()=>{
         const authCookie=this.cookie.get('token');
         authCookie ? this.authHandler():this.logoutHandler();
     }
     setUsername=(term)=>{
         this.setState({username:term})
     }
    render(){
        return(
            <div>
                <Nav 
                username={this.state.username}
                logoutHandler={this.logoutHandler}
                 isAthenticated={this.state.isAthenticated}/>
                <Switch>
                <Route path="/" exact>
                    <Home/>
                    </Route>
                <Route path="/auth">
                    <AuthPage
                     isAthenticated={this.state.isAthenticated}
                     authHandler={this.authHandler}
                     />
                     </Route>
            <ProtectedRoute
             auth={this.state.isAthenticated} 
             path="/todolist">
                 <TodoListPage setUsername={this.setUsername}/>
                 </ProtectedRoute>
                </Switch> 
            </div>
        )
    }
}

export default App;






