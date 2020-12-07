import React ,{useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Signup = () =>{

    const history = useHistory();
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl]=useState(undefined)

    useEffect(()=>{
        if(url)
       uploadFeilds();
    },[url])

 const uploadFeilds = ()=>{
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    fetch('/signup',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
               name,
                email,
                password,
                pic: url
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error)
            M.toast({html: `${data.error}`,classes:'#c62828 red darken-3'})
            else
            {
                M.toast({html: `${data.message}`,classes:'#43a047 green darken-1'})
                history.push('/login')
            }
    
        }).catch(err=>{
            console.log(err);
        })
        else
        M.toast({html: `Invalid Email Address`,classes:'#c62828 red darken-3'})
    
 }
    const signupHandler=(e)=>{
   e.preventDefault();
   if(image)
   {
       uploadPic()
   }
   else{
       uploadFeilds()
   }

 }
 const uploadPic = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","lakshayb")
    fetch('https://api.cloudinary.com/v1_1/lakshayb/image/upload',{
        method: 'POST',
        body:data
    }).then(res=>res.json())
    .then(data1=>{
          console.log(data1)
          setUrl(data1.url)

    }).catch(err=>{
        console.log(err)
    })
 }

    return(
        <>
        <div className="mycard">
        <h5>Signup</h5>
        <div className="card auth-card input-field">
           <h2>Instagram</h2>
           
           <input type="text"
           placeholder="name"
           value={name}
           onChange={(e)=>setName(e.target.value)}
           />

           <input type="email"
           placeholder="Email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           />
          
           <input type="password"
           placeholder="Password"
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
           />
              <div className="file-field input-field">
      <div className="btn">
        <span>Upload Profile Picture</span>
        <input type="file" onChange={(e)=>{
            setImage(e.target.files[0])
        }}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"  name="action"
            onClick={(e)=>{
                signupHandler(e);
            }}
            >
                 SignUp
            </button>
            <h5><Link to="/login">Already Have an Account ?</Link></h5>
      </div>
    </div>  
        </>
    )
}

export default Signup;
