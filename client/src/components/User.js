
import React,{useEffect,useState,useContext} from 'react';
import {userContext} from '../App';
import {useParams} from 'react-router-dom';

const User = () =>{

    const [userProfile,setUserProfile] = useState(null)
   const {state,dispatch} = useContext(userContext);
   const {userId} = useParams()
   const [showFollow,setShowFollow] = useState(state?!state.following.includes(userId):true);
    useEffect(()=>{
        fetch(`/user/${userId}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    }
    ).then(res=>res.json()).then(data=>{
        console.log(data)
       
        setUserProfile(data)
        console.log(userProfile)
    })
    .catch(err=>{
        console.log(err);
    })
},[])


useEffect(()=>{
    fetch(`/user/${userId}`,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
}
).then(res=>res.json()).then(data=>{
    console.log(data)
   
    setUserProfile(data)
    console.log(userProfile)
})
.catch(err=>{
    console.log(err);
})
},[showFollow])


const followUser = ()=>{
    fetch('/follow',{
        method: 'put',
        headers:{
            "Content-type" : "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            followId: userId
        })
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        dispatch({type:'UPDATE',payload:{following: data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
       setShowFollow(false)
        setUserProfile(prevState=>{
        
            return {
                ...prevState,
                user: {
                    ...prevState.user,
                    followers: [...prevState.user[0].followers, data._id]
                }
            }
        })
    }).catch(err=>{
        console.log(err)
    })
}



const unfollowUser = ()=>{
    fetch('/unfollow',{
        method: 'put',
        headers:{
            "Content-type" : "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            unfollowId: userId
        })
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        dispatch({type:'UPDATE',payload:{following: data.following,followers:data.followers}})
        localStorage.setItem('user',JSON.stringify(data))
       setShowFollow(true)
        setUserProfile(prevState=>{
            const newfollower = prevState.user[0].followers.filter(item=>item!= data._id)
            return {
                ...prevState,
                user: {
                    ...prevState.user,
                    followers: newfollower
                }
            }
        })
    }).catch(err=>{
        console.log(err)
    })
}



    return(
        <>
        {userProfile?<div style={{
            maxWidth: "550px", margin: "0px auto"
        }}>
       <div  style={{
             display: "flex",
             justifyContent: "space-around",
             margin:"18px 0px",
             borderBottom: "1px solid gray"

         }}>
         <div>
   
             <img style={{
                 width: "160px" ,
                 height: "160px",
                 borderRadius: "80px"
             }} 
             src={userProfile.user.pic}
             />
         </div> 
         <div>
            <h4> {userProfile.user[0].name}</h4>
            <h5> {userProfile.user[0].email}</h5>
             <div style={{display:"flex",justifyContent:'space-between', width: "108%"}}>
            <h6>{userProfile.posts.length} Post</h6>
            <h6>{userProfile.user[0].followers.length} Followers</h6>
                 <h6>{userProfile.user[0].following.length} Following</h6>
             </div>
             {showFollow?   <button className="btn waves-effect waves-light #64b5f6 blue darken-1"  name="action"
            onClick={(e)=>{
             followUser()
            }}
            >
                 Follow
            </button>:
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"  name="action"
            onClick={(e)=>{
             unfollowUser()
            }}
            >
                 Unfollow
            </button>
            }
          

            
        </div> 
        </div>
        <div className="gallery">
        {       
                 userProfile.posts.map(item=>{
                     return(
                        <img src={item.photo}
                        alt={item.title}
           className="item"
           />
                     )
                 })
             }
           {/* <img src={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8MnwwfA%3D%3D&auto=format&fit=crop&w=500&q=60"}
           className="item"
           />
            <img src={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8MnwwfA%3D%3D&auto=format&fit=crop&w=500&q=60"}
           className="item"
           />
            <img src={"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8MnwwfA%3D%3D&auto=format&fit=crop&w=500&q=60"}
           className="item"
           /> */}
        </div>
        </div>:<h2>Loading</h2>}
        
        </>
    )
}

export default User;
