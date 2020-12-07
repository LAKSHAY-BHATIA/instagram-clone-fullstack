import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const CreatePost = ()=>{

    const history = useHistory();
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [image,setImage] = useState('')
    const [imageURL,setImageURL] =useState(null)
   
    useEffect(()=>{ 
        if(imageURL)
        {
        fetch('/createpost',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
           title,body,
           photo: imageURL
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error)
        M.toast({html: `${data.error}`,classes:'#c62828 red darken-3'})
        else
        {
            M.toast({html: `successfully created the post`,classes:'#43a047 green darken-1'})
         history.push('/')
        }

    }).catch(err=>{
        console.log(err);
    })}},[imageURL])

    const handleSubmit = (e)=>{
     e.preventDefault();
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
           setImageURL(data1.url)

     }).catch(err=>{
         console.log(err)
     })
    
    }
return(
    <div className="card input-filed"
    style={{
        margin: "40px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: 'center'
    }}
    >
        <input type="text" placeholder="title"
        value={title}
        onChange={(e)=>{
           setTitle(e.target.value)
        }}
        />
        <input type="text"
        value={body}
        placeholder="body"
        onChange={(e)=>setBody(e.target.value)}
        />

        <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>{
            setImage(e.target.files[0])
        }}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button 
    onClick={(e)=>{
        handleSubmit(e)
    }}
    className="btn waves-effect waves-light #64b5f6 blue darken-1"  name="action">
                 Submit
            </button>

    </div>
)
}

export default CreatePost