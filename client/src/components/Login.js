import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { userContext} from '../App';
const Login = () =>{
    const {state,dispatch} = useContext(userContext);

const history = useHistory()
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

const handleLogin = (e)=>{
           e.preventDefault();
           if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
fetch('/signin',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
           
            email,
            password
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error)
        M.toast({html: `${data.error}`,classes:'#c62828 red darken-3'})
        else
        {   localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
         dispatch({type:'USER',payload: data.user});
            M.toast({html: `${data.message}`,classes:'#43a047 green darken-1'})
         history.push('/')
        }

    }).catch(err=>{
        console.log(err);
    })
    else
    M.toast({html: `Invalid Email Address`,classes:'#c62828 red darken-3'})

}
    return(
        <>
        <div className="mycard">
        <h5>Login</h5>
        <div className="card auth-card input-field">
           <h2>Instagram</h2>
           <input type="email"
           placeholder="Email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           />
           <input type="password"
           placeholder="Password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"  name="action"
            onClick={(e)=>{
                handleLogin(e)
            }}
            >
                 LOGIN
            </button>
            <h5><Link to="/signup">Don't Have an Account ?</Link></h5>
      </div>
    </div>  
        </>
    )
}

export default Login;
