import React,{useContext} from 'react';
import {userContext} from '../App'
import {Link,useHistory} from 'react-router-dom';

const NavBar = () =>{
  const {state,dispatch}=useContext(userContext)
   const history = useHistory()
  const renderList = ()=>{
    if(state)
    {
return [
  <li><Link to="/">Home</Link></li>,
<li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/myfollowingposts">My Following Posts</Link></li>,
        <li>
        <button className="btn waves-effect waves-light #c62828 red darken-3"  name="action"
             onClick={(e)=>{
                 localStorage.clear();
                 dispatch({type:'CLEAR'})
                 history.push('/login')
             }}
             >
                  Logout
             </button>
        </li>,
       
        
]
    }
    else{
return [
  <li><Link to="/login">Login</Link></li>,
  <li><Link to="/signup">Signup</Link></li>,
  
]
    }
  }
 
    return(
        <>
       <nav>
    <div class="nav-wrapper white">
      <Link to={state?"/":"/login"} class="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" class="right">
       {renderList()}
      
      </ul>
    </div>
  </nav>
        </>
    )
}

export default NavBar;

