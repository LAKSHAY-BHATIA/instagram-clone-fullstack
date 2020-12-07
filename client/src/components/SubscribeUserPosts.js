import React,{useState,useEffect,useContext} from 'react';
import {userContext } from '../App';
import {Link} from 'react-router-dom';
const SubscribeUserPosts = () =>{
    const {state,dispatch} = useContext(userContext);
    const [data,setData] = useState([]);
    useEffect(()=>{
    fetch('/getsubpost',{
        method:'GET',
        headers:{
            "Authorization":`Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(res=>res.json()).then(result=>{
        setData(result.posts);
    }).catch(err=>{console.log(err)})
    },[data])

const likePost = (id)=>{
fetch('/like',{
    method: 'put',
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')

    },
    body: JSON.stringify({
        postId:id
    })
}).then(res=>res.json()).then(result=>{

    const newData = data.map(item=>{
        if(item._id===result._id){
            return result
        }
        else
        return item
    })
    setData(newData);
}).catch(err=>{
    console.log(err);
})
}


const deletePost = (postId)=>{
    fetch(`/deletepost/${postId}`,{
        method:'delete',
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        }
    }).then(res=>res.json()).then(result=>{
        console.log(result);
    }).
    catch(err=>{

    })
}




const unlikePost = (id)=>{
    fetch('/unlike',{
        method: 'put',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
    
        },
        body: JSON.stringify({
            postId:id
        })
    }).then(res=>res.json()).then(result=>{
    const newData = data.map(item=>{
        if(item._id===result._id){
            return result
            const newData = data.filter(item=>{
                return item._id!== result._id
            })
            setData(newData);
        }
        else
        return item
    })
    setData(newData);

    }).catch(err=>{
        console.log(err);
    })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:'put',
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
            body:JSON.stringify({
                postId: postId,
                text: text
            })
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }
                else
                return item
            })
            setData(newData);
        }).catch(err=>console.log(err))
    }

    return(
        <>
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5 style={{
                            padding: "5px"
                        }}>
                            <Link to={
                                item.postedBy._id!== state._id?`/profile/${item.postedBy._id}`:"/profile"
                            }>{item.postedBy.name}</Link>
                        {item.postedBy._id== state._id?
                        <i className="material-icons" style={{
                            float:'right'
                        }}
                        onClick={()=>{
                            deletePost(item._id);
                        }}
                        >delete</i>:null}
                        </h5>
                        <div className="card-image">
                            <img src={`${item.photo}`}
                            />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color: 'red'}} >favorite</i>
                            {item.likes.includes(state._id)?
                              <i class="material-icons"
                              onClick={(e)=>{
                                  e.preventDefault()
                                 unlikePost(item._id)
                              }}
                              >thumb_down</i>:
                              <i className="material-icons" onClick={()=>{
                                //  e.preventDefault()
                                console.log('click')
                                  likePost(item._id)
                              }}>thumb_up</i>   
                        }
                           
                            <h6>{item.likes.length} Likes</h6>
                    <h6>{item.title}</h6>
                                <p>{item.body}
                                </p>

                                    {item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{
                                            fontWeight:"500"
                                        }}>{record.postedBy.name}</span> {
                                            record.text
                                        }</h6>
                                        )
                                    })}

                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                    console.log(e.target[0].value)
                                }}> 
                                    <input type="text"
                                
                                placeholder="Add Comment.."/>
                                
                                </form>
                               
                        </div>
                        </div>
                    )
                })
            }
          
        </div>    
        </>
    )
}

export default SubscribeUserPosts;
