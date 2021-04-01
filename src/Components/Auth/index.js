

import React,{Component} from 'react';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
class Auth extends Component{
    state={loginFormShow:true}
cookie=new Cookies();

    loginHandler=async (event)=>{
        event.preventDefault();
        const loginData={
            username:event.target[0].value ,
             password:event.target[1].value  
        } 
        try{
        const response=await axios.post('http://localhost:8000/api/v1/users/login/',loginData)
       console.log(response);
       this.cookie.set('token',response.data.token);
       this.props.authHandler();
        console.log(loginData);
        }catch(error){
            return alert(error.response.data.message);
        }
   
    }
   
    signupHandler= async (event)=>{
        event.preventDefault();
        const signupData={
            username:event.target[0].value ,
            email:event.target[1].value ,
             password:event.target[2].value  
        } 
        try{
        const response=await axios.post('http://localhost:8000/api/v1/users/signup/',signupData)
       console.log(response);   
       this.cookie.set('token',response.data.token);
       this.props.authHandler() ;     
      //  console.log(signupData);
        }catch(error){
            return alert(error.response.data.message);
        }
    }
    render(){
        if (this.props.isAthenticated) {
            return <Redirect to="/todolist" />;
        }
        return(
            <>
            <div className="box">
                <div className="toggle">
                    <h1
                    className={
                     this.state.loginFormShow?'active':''
                    }
                    onClick={()=>
                    this.setState({loginFormShow:true})}
                    >Login</h1>
                    <h1
                     className={
                    !this.state.loginFormShow?'active':''
                    }
                     onClick={()=>
                    this.setState({loginFormShow:false})}
                    >SignIn</h1>
                </div>
           
            {this.state.loginFormShow?(<form
            onSubmit={this.loginHandler}>
                <input placeholder="username" type="text"/>
                <input placeholder="password" type="password"/>
                <button className="submit-btn">login</button>
            </form>) :(<form
            onSubmit={this.signupHandler}>
            <input placeholder="username" type="text"/>
                <input placeholder="email" type="email"/>
                <input placeholder="password" type="password"/>
                <button className="submit-btn">register</button>
            </form>)}

            </div>
            </>
        )
    }
}
export default Auth;