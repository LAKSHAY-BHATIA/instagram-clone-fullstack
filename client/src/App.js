import React,{createContext,useReducer,useContext,useEffect} from 'react';
import {Route,Switch,useHistory} from 'react-router-dom';
import NavBar from './components/NabBar';
import Home from './components/Home';
import Login from './components/Login'
import Signup from './components/Signup';
import Profile from './components/Profile';
import './App.css';
import CreatePost from './components/CreatePost';
import {reducer,initState} from './reducer/userReducer';
import User from './components/User';
import SubscribeUserPosts from './components/SubscribeUserPosts'

export const userContext = createContext()


const Routing =()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(userContext);
  useEffect(()=>{
     const user = JSON.parse(localStorage.getItem("user"));

     if(user){
       dispatch({type:'USER',payload:user})
    //  history.push('/');
  }
     else
     history.push('/login');
  },[])
  return(
    <Switch>
         <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/signup" component={Signup}/>
    <Route exact path="/profile" component={Profile}/>
    <Route exact path="/create" component={CreatePost}/>
    <Route exact path="/myfollowingposts" component={SubscribeUserPosts}/>
    <Route exact path="/profile/:userId" component={User}/>   
    </Switch>
     )
}
const App = ()=>{
  const [state,dispatch] = useReducer(reducer,initState)
  return(
    <>
    <userContext.Provider value={{state,dispatch}}>
    <NavBar/>
      <Routing/>
      </userContext.Provider>
    </>
  )
}

export default App;